import {Editor, settings} from '../classes/Editor';
import eventContext from './event-context';
import {unitsRootToLocal, unitsRootToViewport} from './units';
import {pointCreate, pointDistance, pointGetCenter, pointApplyMatrix} from './point';
import {rectCreate} from './rect';
import {matrixCreate, matrixGetTranformForElement} from './matrix';
import {helperRemove, helperCreateByPoints} from './helper';
import {setTransform} from './misc';

// minify
const doc = document;

// vars
let current = null;

/**
 * Register drag event listener
 */
export function dragRegister() {
    const addEventListener = doc.addEventListener;
    addEventListener.call(doc, 'mousedown',  onMouseDown);
    addEventListener.call(doc, 'mousemove',  onMouseMove);
    addEventListener.call(doc, 'mouseup',    onMouseUp);
    addEventListener.call(doc, 'touchstart', onMouseDown, {passive: false});
    addEventListener.call(doc, 'touchmove',  onMouseMove, true);
    addEventListener.call(doc, 'touchend',   onMouseUp,   true);
}

/**
 * mousedown event handler
 * @param {MouseEvent|TouchEvent} e 
 */
function onMouseDown(e) {
    const sel = '.' + settings.base;
    let el = eventContext(e, sel);
    let editor = el && Editor.getInstance(el);
    if (editor) {
        start(e, editor);
    }
}

/**
 * mousemove event handler
 * @param {Event} e 
 */
function onMouseMove(e) {
    current && drag(e);
}

/**
 * mouseup event handler
 * @param {Event} e 
 */
function onMouseUp(e) {
    current && end(e);
}

/**
 * Return click/touch coordinate
 * @param {Event} e 
 * @returns {DOMPoint}
 */
function getEventPoint(e) {
    let touches = e.changedTouches;
    let storage = touches && touches[0] ? touches[0] : e;
    return pointCreate(storage.clientX, storage.clientY);
}

/**
 * Start drag
 * @param {MouseEvent|TouchEvent} e 
 * @param {Editor} editor
 */
function start(e, editor) {
    const sel = '.' + settings.base;
    let operation = null;
    if (eventContext(e, `${sel}__move`)) {
        operation = move;
    }
    if (eventContext(e, `${sel}__rotate`)) {
        operation = rotate;
    }
    if (eventContext(e, `${sel}__scale`)) {
        operation = scale;
    }
    let detail = {operation, event: e, params: {}};
    let prevented = editor.triggerEvent('DragStart', detail);
    operation = detail.operation;
    if (!prevented && operation) {
        e.preventDefault();
        current = {
            editor,
            start: getEventPoint(e),
            operation,
            params: detail.params,
        };
    }
}

/**
 * Drag itaration
 * @param {MouseEvent|TouchEvent} e 
 */
function drag(e) {
    let editor = current.editor;
    current.current = getEventPoint(e);
    let detail = {
        operation: current.operation,
        event: e,
        params: {},
    };
    editor.triggerEvent('Drag', detail);
    Object.assign(current.params, detail.params);
    current.operation(e, current);
    let target = e.target;
    if (!current.saveTarget) {
        current.saveTarget = target;
        target.style.visibility = 'hidden';
        document.body.appendChild(target);
    }
}

/**
 * End drag
 * @param {MouseEvent|TouchEvent} e 
 */
function end(e) {
    let editor = current.editor;
    current.current = getEventPoint(e);
    if (editor.historyPush && current.matrix) {
        editor.historyPush({
            undo,
            redo,
            prev: current.matrix,
            next: getSelectionTransformMap(),
        });
    }
    let detail = {
        event: e,
        operation: current.operation,
        params: {},
    };
    let prevented = editor.triggerEvent('DragEnd', detail);
    Object.assign(current.params, detail.params);
    current.operation(e, current);
    !prevented && editor.refreshHelper();
    let saveTarget = current.saveTarget;
    if (saveTarget) {
        saveTarget.parentNode.removeChild(saveTarget);
    }
    editor.triggerEvent('DragComplete', detail);
    current = null;
}

/**
 * Move operation
 */
function move() {
    let editor = current.editor;
    let dx = current.current.x - current.start.x;
    let dy = current.current.y - current.start.y;
    let local = unitsRootToLocal(editor, rectCreate(0, 0, dx, dy));
    saveMatrix();
    editor.selection.forEach(item => {
        let matrix = current.matrix.get(item);
        matrix = matrixCreate().translateSelf(local.width, local.height).multiplySelf(matrix);
        setTransform(item, matrix);
    });
    let matrix = matrixCreate().translateSelf(dx, dy);
    transformHelper(editor, matrix);
}

/**
 * Rotate operation
 */
function rotate() {
    let editor = current.editor;
    let cr = pointGetCenter(editor.helperPoints);
    let cv = unitsRootToViewport(editor, cr);
    let cl = unitsRootToLocal(editor, cr);
    let a  = Math.atan2(cv.y - current.current.y, current.current.x - cv.x);
    a -= Math.atan2(cv.y - current.start.y, current.start.x - cv.x);
    if (a < -Math.PI) {
        a += 2 * Math.PI;
    }
    saveMatrix();
    editor.selection.forEach(item => {
        let matrix = current.matrix.get(item);
        matrix = matrixCreate()
            .translateSelf(cl.x, cl.y)
            .rotateSelf(-a * 180 / Math.PI)
            .translateSelf(-cl.x, -cl.y)
            .multiplySelf(matrix);
        setTransform(item, matrix);
    });
    let matrix = matrixCreate()
        .translateSelf(cr.x, cr.y)
        .rotateSelf(-a * 180 / Math.PI)
        .translateSelf(-cr.x, -cr.y);
    transformHelper(editor, matrix);
}

/**
 * Scale operation
 */
function scale() {
    let editor = current.editor;
    let cr = pointGetCenter(editor.helperPoints);
    let cv = unitsRootToViewport(editor, cr);
    let cl = unitsRootToLocal(editor, cr);
    let scaleX, scaleY, angle;
    saveMatrix();
    if (current.params.changeAspectRatio) {
        if (editor.selection.length === 1) {
            let matrix = current.matrix.get(editor.selection[0]);
            angle = Math.atan2(-matrix.b, matrix.a) * 180 / Math.PI;
        } else {
            angle = 0;
        }
        let matrix = matrixCreate()
            .rotateSelf(angle)
            .translateSelf(-cv.x, -cv.y);
        let cur   = pointApplyMatrix(current.current, matrix);
        let start = pointApplyMatrix(current.start, matrix);
        scaleX = cur.x / start.x;
        scaleY = cur.y / start.y;
    } else {
        let r1 = pointDistance(current.current, cv);
        let r0 = pointDistance(current.start, cv);
        scaleX = scaleY = r1 / r0;
        angle  = 0;
    }
    editor.selection.forEach(item => {
        let matrix = current.matrix.get(item);
        matrix = matrixCreate()
            .translateSelf(cl.x, cl.y)
            .rotateSelf(-angle)
            .scaleSelf(scaleX, scaleY)
            .rotateSelf(angle)
            .translateSelf(-cl.x, -cl.y)
            .multiplySelf(matrix);
        setTransform(item, matrix);
    });
    let matrix = matrixCreate()
        .translateSelf(cr.x, cr.y)
        .rotateSelf(-angle)
        .scaleSelf(scaleX, scaleY)
        .rotateSelf(angle)
        .translateSelf(-cr.x, -cr.y);
    transformHelper(editor, matrix);
}

/**
 * Return map of transform matrix for selection
 * @param {SVGElement[]} [elements]
 */
function getSelectionTransformMap(elements) {
    let map = new Map();
    (elements || current.editor.selection).forEach(item => {
        map.set(item, matrixGetTranformForElement(item));
    });
    return map;
}

/**
 * Save transform on drag start
 */
function saveMatrix() {
    if (!current.matrix) {
        current.matrix = getSelectionTransformMap();
    }
}

/**
 * Temporary transform helper
 * @param {Editor} editor
 * @param {DOMMatrix} matrix 
 */
function transformHelper(editor, matrix) {
    helperRemove(editor);
    let points = editor.helperPoints.slice();
    points.forEach((point, i) => {
        points[i] = pointApplyMatrix(point, matrix);
    });
    helperCreateByPoints(editor, points);
}

/**
 * Transform elements
 * @param {Editor} editor 
 * @param {SVGElement[]} elements
 * @param {DOMMatrix} matrix 
 */
export function transformElements(editor, elements, matrix) {
    let prev = getSelectionTransformMap(elements);
    elements.forEach(item => {
        setTransform(item, matrixCreate().multiplySelf(matrix).multiplySelf(prev.get(item)));
    });
    if (editor.historyPush) {
        editor.historyPush({
            undo,
            redo,
            prev,
            next: getSelectionTransformMap(elements),
        });
    }
    editor.refreshHelper();
}

/**
 * Apply drag undo
 * @param {Editor} editor
 * @param {Object} data 
 */
function undo(editor, data) {
    data.prev.forEach((matrix, item) => {
        setTransform(item, matrix);
    });
    editor.refreshHelper();
}

/**
 * Apply drag redo
 * @param {Editor} editor
 * @param {Object} data 
 */
function redo(editor, data) {
    data.next.forEach((matrix, item) => {
        setTransform(item, matrix);
    });
    editor.refreshHelper();
}
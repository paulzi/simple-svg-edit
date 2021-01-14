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
    addEventListener.call(doc, 'touchstart', onMouseDown);
    addEventListener.call(doc, 'touchmove',  onMouseMove);
    addEventListener.call(doc, 'touchend',   onMouseUp);
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
    let detail = {operation, event: e};
    let prevented = editor.triggerEvent('DragStart', detail);
    operation = detail.operation;
    if (!prevented && operation) {
        current = {
            editor,
            x: e.clientX,
            y: e.clientY,
            operation,
        };
    }
}

/**
 * Drag itaration
 * @param {MouseEvent|TouchEvent} e 
 */
function drag(e) {
    current.operation(e, current);
}

/**
 * End drag
 * @param {MouseEvent|TouchEvent} e 
 */
function end(e) {
    let editor = current.editor;
    current.operation(e, current);
    if (editor.historyPush && current.matrix) {
        editor.historyPush({
            undo,
            redo,
            prev: current.matrix,
            next: getSelectionTransformMap(),
        });
    }
    let prevented = editor.triggerEvent('DragEnd', {
        event: e,
        operation: current.operation,
    });
    !prevented && editor.refreshHelper();
    current = null;
}

/**
 * Move operation
 * @param {MouseEvent|TouchEvent} e 
 */
function move(e) {
    let editor = current.editor;
    let dx = e.clientX - current.x;
    let dy = e.clientY - current.y;
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
 * @param {MouseEvent|TouchEvent} e 
 */
function rotate(e) {
    let editor = current.editor;
    let cr = pointGetCenter(editor.helperPoints);
    let cv = unitsRootToViewport(editor, cr);
    let cl = unitsRootToLocal(editor, cr);
    let a  = Math.atan2(cv.y - e.clientY, e.clientX - cv.x);
    a -= Math.atan2(cv.y - current.y, current.x - cv.x);
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
 * @param {MouseEvent|TouchEvent} e 
 */
function scale(e) {
    let editor = current.editor;
    let cr = pointGetCenter(editor.helperPoints);
    let cv = unitsRootToViewport(editor, cr);
    let cl = unitsRootToLocal(editor, cr);
    let r1 = pointDistance(pointCreate(e.clientX, e.clientY), cv);
    let r0 = pointDistance(pointCreate(current.x, current.y), cv);
    let scale = r1 / r0;
    saveMatrix();
    editor.selection.forEach(item => {
        let matrix = current.matrix.get(item);
        matrix = matrixCreate()
            .translateSelf(cl.x, cl.y)
            .scaleSelf(scale)
            .translateSelf(-cl.x, -cl.y)
            .multiplySelf(matrix);
        setTransform(item, matrix);
    });
    let matrix = matrixCreate()
        .translateSelf(cr.x, cr.y)
        .scaleSelf(scale)
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
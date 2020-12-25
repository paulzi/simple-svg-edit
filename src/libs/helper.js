import {pointApplyMatrix} from './point';
import {rectCorners, rectBoundingClientRectMultiple} from './rect';
import {matrixGetTranformForElement} from './matrix';
import {unitsLocalToRoot, unitsViewportToRoot} from './units';
import {settings} from '../classes/Editor';

/**
 * Create helper for current selection
 * @param {Editor} editor 
 */
export function helperCreate(editor) {
    let points;
    if (editor.selection.length === 0) {
        editor.helperPoints = [];
        return;
    }
    if (editor.selection.length === 1) {
        points = helperGetPointsForItem(editor, editor.selection[0]);
    } else {
        points = helperGetPointsForSelection(editor);
    }
    editor.helperPoints = points;
    helperCreateByPoints(editor, points);
}

/**
 * Remove helper
 * @param {Editor} editor 
 */
export function helperRemove(editor) {
    if (editor.helper) {
        editor.helpers.removeChild(editor.helper);
        editor.helper = null;
    }
}

/**
 * Get helper corner points for item
 * @param {Editor} editor 
 * @param {SVGElement} item
 */
export function helperGetPointsForItem(editor, item) {
    let bound = item.getBBox();
    let points = rectCorners(bound);
    let matrix = matrixGetTranformForElement(item);
    points.forEach((point, i) => {
        point = pointApplyMatrix(point, matrix);
        point = unitsLocalToRoot(editor, point);
        points[i] = point;
    });
    return points;
}

/**
 * Get helper corner points for selection
 * @param {Editor} editor 
 */
export function helperGetPointsForSelection(editor) {
    let bound = rectBoundingClientRectMultiple(editor.selection);
    bound = unitsViewportToRoot(editor, bound);
    return rectCorners(bound);
}

/**
 * Create helper by corner points
 * @param {Editor} editor
 * @param {DOMPoint[]} points
 */
export function helperCreateByPoints(editor, points) {
    if (!settings.createHelper) {
        throw new Error('createHelper is not set');
    }
    let helper = settings.createHelper(editor, points);
    editor.helper = helper;
    editor.helpers.appendChild(helper);
}
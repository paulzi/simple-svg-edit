import {pointCreate} from  './point';
import {rectCreate} from  './rect';

/**
 * Convert point or rect from viewport to root svg editor coordinates
 * @param {Editor} editor
 * @param {DOMPoint|DOMRect} value
 * @returns {DOMPoint|DOMRect}
 */
export function unitsViewportToRoot(editor, value) {
    let rBound = editor.root.getBoundingClientRect();
    if (value.width !== undefined) {
        return rectCreate(value.x - rBound.x, value.y - rBound.y, value.width, value.height);
    }
    return pointCreate(value.x - rBound.x, value.y - rBound.y);
}

/**
 * Convert point or rect from root svg editor to viewport coordinates
 * @param {Editor} editor
 * @param {DOMPoint|DOMRect} value
 * @returns {DOMPoint|DOMRect}
 */
export function unitsRootToViewport(editor, value) {
    let rBound = editor.root.getBoundingClientRect();
    if (value.width !== undefined) {
        return rectCreate(value.x + rBound.x, value.y + rBound.y, value.width, value.height);
    }
    return pointCreate(value.x + rBound.x, value.y + rBound.y);
}

/**
 * Convert point or rect from root svg editor to local svg coordinates
 * @param {Editor} editor
 * @param {DOMPoint|DOMRect} value
 * @returns {DOMPoint|DOMRect}
 */
export function unitsRootToLocal(editor, value) {
    let vbSvg  = editor.svg.viewBox.baseVal;
    let vbRoot = editor.root.viewBox.baseVal;
    let aSvg   = vbSvg.width  / vbSvg.height;
    let aRoot  = vbRoot.width / vbRoot.height;
    let rw, rh;
    if (aRoot > aSvg) {
        rw = aSvg * vbRoot.height;
        rh = vbRoot.height;
    } else {
        rw = vbRoot.width;
        rh = vbRoot.width / aSvg;
    }
    let dx     = (vbRoot.width  - rw) / 2;
    let dy     = (vbRoot.height - rh) / 2;
    let scaleX = vbSvg.width  / rw;
    let scaleY = vbSvg.height / rh;
    if (value.width !== undefined) {
        return rectCreate((value.x - dx) * scaleX, (value.y - dy) * scaleY, value.width * scaleX, value.height * scaleY);
    }
    return pointCreate((value.x - dx) * scaleX, (value.y - dy) * scaleY);
}

/**
 * Convert point or rect from local svg to root svg editor coordinates
 * @param {Editor} editor
 * @param {DOMPoint|DOMRect} value
 * @returns {DOMPoint|DOMRect}
 */
export function unitsLocalToRoot(editor, value) {
    let vbSvg  = editor.svg.viewBox.baseVal;
    let vbRoot = editor.root.viewBox.baseVal;
    let aSvg   = vbSvg.width  / vbSvg.height;
    let aRoot  = vbRoot.width / vbRoot.height;
    let rw, rh;
    if (aRoot > aSvg) {
        rw = aSvg * vbRoot.height;
        rh = vbRoot.height;
    } else {
        rw = vbRoot.width;
        rh = vbRoot.width / aSvg;
    }
    let dx     = (vbRoot.width  - rw) / 2;
    let dy     = (vbRoot.height - rh) / 2;
    let scaleX = vbSvg.width  / rw;
    let scaleY = vbSvg.height / rh;
    if (value.width !== undefined) {
        return rectCreate(value.x / scaleX + dx, value.y / scaleY + dy, value.width / scaleX, value.height / scaleY);
    }
    return pointCreate(value.x / scaleX + dx, value.y / scaleY + dy);
}

/**
 * Convert point or rect from viewport to local svg coordinates
 * @param {Editor} editor
 * @param {DOMPoint|DOMRect} value
 * @returns {DOMPoint|DOMRect}
 */
export function unitsViewportToLocal(editor, value) {
    return unitsRootToLocal(editor, unitsViewportToRoot(editor, value));
}
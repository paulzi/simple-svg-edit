import {settings, Editor} from '../classes/Editor';
import {rectBoundingClientRectMultiple} from './rect';
import {matrixCreate} from './matrix';
import {unitsViewportToLocal} from './units';

/**
 * Align targets relative SVG or other element or bound
 * @param {Number} x left-right factor 0.0-1.0
 * @param {Number} y up-down factor 0.0-1.0
 * @param {Object} [params] 
 * @returns {Editor} this 
 */
 Editor.prototype.align = function(targets, x, y, params = {}) {
    let boundIn  = unitsViewportToLocal(this, rectBoundingClientRectMultiple(targets));
    let context  = params.context || this.svg.querySelector(`.${settings.base}__zone > rect`) || this.svg;
    let boundOut = params.bound || unitsViewportToLocal(this, context.getBoundingClientRect());
    let dx = x === null ? 0 : boundOut.x + x * (boundOut.x + boundOut.width  - boundIn.width  - boundOut.x) - boundIn.x;
    let dy = y === null ? 0 : boundOut.y + y * (boundOut.y + boundOut.height - boundIn.height - boundOut.y) - boundIn.y;
    this.transformElements(targets, matrixCreate().translateSelf(dx, dy));
    return this;
};

/**
 * Align selection relative SVG or other element or bound
 * @param {Number} x left-right factor 0.0-1.0
 * @param {Number} y up-down factor 0.0-1.0
 * @param {Object} [params] 
 */
Editor.prototype.alignSelection = function(x, y, params = {}) {
    this.align(this.selection, x, y, params);
};
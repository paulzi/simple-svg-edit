import {settings, Editor} from '../classes/Editor';
import {rectBoundingClientRectMultiple} from './rect';
import {matrixCreate} from './matrix';
import {unitsViewportToLocal} from './units';

/**
 * Align selection relative SVG or other element or bound
 * @param {Number} x left-right factor 0.0-1.0
 * @param {Number} y up-down factor 0.0-1.0
 * @param {Object} [params] 
 */
Editor.prototype.alignSelection = function(x, y, params = {}) {
    let boundIn  = unitsViewportToLocal(this, rectBoundingClientRectMultiple(this.selection));
    let context  = params.context || this.svg.querySelector(`.${settings.base}__area-zone`) || this.svg;
    let boundOut = params.bound || unitsViewportToLocal(this, context.getBoundingClientRect());
    let dx = boundOut.x + x * (boundOut.x + boundOut.width  - boundIn.width  - boundOut.x) - boundIn.x;
    let dy = boundOut.y + y * (boundOut.y + boundOut.height - boundIn.height - boundOut.y) - boundIn.y;
    this.transformSelection(matrixCreate().translateSelf(dx, dy));
};
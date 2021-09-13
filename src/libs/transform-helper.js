import {Editor} from '../classes/Editor';
import {matrixGetTranformForElement, matrixCreate} from './matrix';
import {pointCreate, pointApplyMatrix} from './point';
import {rectCenter} from './rect';

/**
 * @param {SVGElement} element 
 * @returns {DOMPoint}
 */
function getCenter(element) {
    return rectCenter(element.getBBox());
}

/**
 * @param {Editor} editor
 * @param {SVGElement} element
 * @param {Function} callback
 * @returns {Editor}
 */
function transform(editor, elements, matrix, asGroup = null) {
    if (asGroup === null) {
        asGroup = elements.length > 1;
    }
    editor.transformElements(elements, asGroup ? matrix : null, asGroup ? null : matrix);
    return editor;
}

/**
 * @param   {SVGElement} element
 * @returns {DomPoint}
 */
Editor.prototype.getTranslation = function(element) {
    let center = getCenter(element);
    let matrix = matrixGetTranformForElement(element);
    let point  = pointApplyMatrix(getCenter(element), matrix);
    return pointCreate(point.x - center.x, point.y - center.y);
};

/**
 * @param   {SVGElement} element
 * @returns {DomPoint}
 */
Editor.prototype.getScale = function(element) {
    let point = getCenter(element);
    let matrix = matrixGetTranformForElement(element);
    let angle = Math.atan2(-matrix.b, matrix.a) * 180 / Math.PI;
    matrix
        .translateSelf(point.x, point.y)
        .rotate(angle)
        .translateSelf(-point.x, -point.y);
    return pointCreate(
        Math.sqrt(matrix.a ** 2 + matrix.c ** 2),
        Math.sqrt(matrix.b ** 2 + matrix.d ** 2),
    );
};

/**
 * @param   {SVGElement} element
 * @returns {Number}
 */
Editor.prototype.getRotation = function(element) {
    let matrix = matrixGetTranformForElement(element);
    return Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
};

/**
 * @param   {SVGElement} element
 * @returns {Number}
 */
 Editor.prototype.getSkew = function(element) {
    let matrix = matrixGetTranformForElement(element);
    let angle1 = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    let angle2 = Math.atan2(matrix.d, matrix.c) * 180 / Math.PI;
    let result = (360 + angle2 - angle1) % 180;
    return 90 - result;
};


/**
 * @param {SVGElement} element
 * @param {Number} x
 * @param {Number} y
 * @returns {Editor}
 */
Editor.prototype.setTranslation = function(element, x, y) {
    let point = this.getTranslation(element);
    return this.translate(element, x - point.x, y - point.y);
};

/**
 * @param {SVGElement} element
 * @param {Number} x
 * @param {Number} [y]
 * @returns {Editor}
 */
Editor.prototype.setScale = function(element, x, y) {
    let scale = this.getScale(element);
    y = y === undefined ? x : y;
    return this.scale(element, x / scale.x, y / scale.y);
};

/**
 * @param {SVGElement} element
 * @param {Number} angle
 * @returns {Editor}
 */
Editor.prototype.setRotation = function(element, angle) {
    let cur = this.getRotation(element);
    return this.rotate(element, angle - cur);
};

/**
 * @param {SVGElement} element
 * @param {Number} angle
 * @returns {Editor}
 */
Editor.prototype.setSkew = function(element, angle) {
    let cur = this.getSkew(element);
    return this.skew(element, -cur).skew(element, angle);
};

/**
 * @param {SVGElement[]} elements
 * @param {Number} x
 * @param {Number} y
 * @returns {Editor}
 */
Editor.prototype.translate = function(elements, x, y) {
    let matrix = matrixCreate().translateSelf(x, y);
    return transform(this, elements, matrix, true);
}

/**
 * @param {SVGElement[]} elements
 * @param {Number} x
 * @param {Number} [y]
 * @param {Boolean|null} [asGroup]
 * @returns {Editor}
 */
Editor.prototype.scale = function(elements, x, y, asGroup) {
    let matrix = matrixCreate().scaleSelf(x, y);
    return transform(this, elements, matrix, asGroup);
};

/**
 * @param {SVGElement[]} elements
 * @param {Number} angle
 * @param {Boolean|null} [asGroup]
 * @returns {Editor}
 */
Editor.prototype.rotate = function(elements, angle, asGroup) {
    let matrix = matrixCreate().rotateSelf(angle);
    return transform(this, elements, matrix, asGroup);
};

/**
 * @param {SVGElement[]} elements
 * @param {Number} angle
 * @param {Boolean|null} [asGroup]
 * @returns {Editor}
 */
Editor.prototype.skew = function(elements, angle, asGroup) {
    let matrix = matrixCreate().skewXSelf(angle);
    return transform(this, elements, matrix, asGroup);
};

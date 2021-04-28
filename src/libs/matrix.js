import {pointCreate} from './point';

/**
 * @param {Array|String} init 
 * @returns {DOMMatrix}
 */
export function matrixCreate(init) {
    let proto = window.DOMMatrix || window.WebKitCSSMatrix || window.MSCSSMatrix;
    return new proto(init);
}

/**
 * Get current transform matrix for element
 * @param {SVGElement} item
 * @returns {DOMMatrix}
 */
export function matrixGetTranformForElement(item) {
    let value = getComputedStyle(item).transform;
    if (value !== 'none') {
        return matrixCreate(value);
    }
    let m = item.transform.baseVal.consolidate();
    m = m && m.matrix;
    if (m) {
        return matrixCreate([m.a, m.b, m.c, m.d, m.e, m.f])
    }
    return matrixCreate();
}

/**
 * @param {DOMMatrix} matrix
 * @returns {DOMPoint}
 */
export function getTranslation(matrix) {
    return pointCreate(matrix.e, matrix.f);
}

/**
 * @param {DOMMatrix} matrix
 * @returns {DOMPoint}
 */
export function getScale(matrix) {
    return pointCreate(
        Math.sqrt(matrix.a ** 2 + matrix.c ** 2),
        Math.sqrt(matrix.b ** 2 + matrix.d ** 2),
    );
}

/**
 * @param {DOMMatrix} matrix
 * @returns {Number}
 */
export function getRotation(matrix) {
    return Math.atan2(-matrix.b, matrix.a) * 180 / Math.PI;
}

/**
 * @param {DOMMatrix} matrix
 * @param {DOMPoint} translation
 * @returns {DOMPoint}
 */
export function setTranslation(matrix, translation) {
    matrix.e = translation.x;
    matrix.f = translation.y;
}

/**
 * @param {DOMMatrix} matrix
 * @param {DOMPoint} scale
 * @returns {DOMPoint}
 */
export function setScale(matrix, scale) {
    let cur = getScale(matrix);
    matrix.a = cur.x > 0 ? matrix.a * scale.x / cur.x : scale.x;
    matrix.b = cur.y > 0 ? matrix.b * scale.y / cur.y : 0;
    matrix.c = cur.x > 0 ? matrix.c * scale.x / cur.x : 0;
    matrix.d = cur.y > 0 ? matrix.d * scale.y / cur.y : scale.y;
}

/**
 * @param {DOMMatrix} matrix
 * @param {Number} rotation
 * @returns {Number}
 */
export function setRotation(matrix, rotation) {
    rotation *= Math.PI / 180;
    let scale = getScale(matrix);
    matrix.a =  scale.x * Math.cos(rotation);
    matrix.b = -scale.y * Math.sin(rotation);
    matrix.c =  scale.x * Math.sin(rotation);
    matrix.d =  scale.x * Math.cos(rotation);
}
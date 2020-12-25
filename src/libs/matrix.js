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
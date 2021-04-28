import {pointCreate} from  './point';

/**
 * Create DOMRect
 * @param {Number} [x]
 * @param {Number} [y]
 * @param {Number} [width]
 * @param {Number} [height]
 * @returns {DOMRect}
 */
export function rectCreate(x, y, width, height) {
    let result = 'DOMRect' in window ? new DOMRect() : {};
    result.x      = x     || 0;
    result.y      = y     || 0;
    result.width  = width || 0;
    result.height = height || 0;
    return result;
}

/**
 * Get center point from rect
 * @param {DOMRect} rect
 * @returns {DOMPoint}
 */
 export function rectCenter(rect) {
    return pointCreate(rect.x + rect.width / 2, rect.y + rect.height / 2);
}

/**
 * Get array of corner points from rect
 * @param {DOMRect} rect
 * @returns {DOMPoint[]}
 */
export function rectCorners(rect) {
    return [
        pointCreate(rect.x,              rect.y),
        pointCreate(rect.x + rect.width, rect.y),
        pointCreate(rect.x + rect.width, rect.y + rect.height),
        pointCreate(rect.x,              rect.y + rect.height),
    ];
}

/**
 * Get bounding client rect for multiple elements
 * @param {Element[]} list 
 * @returns {DOMRect}
 */
export function rectBoundingClientRectMultiple(list) {
    let max = {};
    let map = [
        ['x',  bound => bound.x],
        ['y',  bound => bound.y],
        ['x2', bound => bound.x + bound.width],
        ['y2', bound => bound.y + bound.height],
    ];
    list.forEach(item => {
        let bound = item.getBoundingClientRect();
        map.forEach(([prop, fn]) => {
            let v = fn(bound);
            if (max[prop] === undefined || v < max[prop]) {
                max[prop] = v;
            }
        });
    });
    return rectCreate(max.x, max.y, max.x2 - max.x, max.y2 - max.y);
}
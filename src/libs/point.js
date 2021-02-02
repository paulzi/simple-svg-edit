/**
 * @param {Number} [x]
 * @param {Number} [y]
 * @returns {DOMPoint}
 */
export function pointCreate(x, y) {
    let result = 'DOMPoint' in window ? new DOMPoint() : {};
    result.x   = x || 0;
    result.y   = y || 0;
    return result;
}

/**
 * @param {DOMPoint} a 
 * @param {DOMPoint} b 
 * @returns {Number}
 */
export function pointDistance(a, b) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

/**
 * @param {DOMPoint} point 
 * @param {DOMMatrix} matrix
 * @returns {DOMPoint}
 */
export function pointApplyMatrix(point, matrix) {
    let x = point.x * matrix.a + point.y * matrix.c + matrix.e;
    let y = point.x * matrix.b + point.y * matrix.d + matrix.f;
    return pointCreate(x, y);
}

/**
 * @param {DOMPoint[]} points
 * @returns {DOMPoint}
 */
export function pointGetCenter(points) {
    let result = pointCreate();
    points.forEach(point => {
        result.x += point.x;
        result.y += point.y;
    });
    result.x /= points.length;
    result.y /= points.length;
    return result;
}

export function polygonPointDefRound(points) {
    let polygon = [];
    points.forEach(point => {
        polygon.push([Math.round(point.x), Math.round(point.y)].join(','));
    });
    return polygon;
}

/**
 * @param {DOMPoint[]} points
 * @param {Number} start
 * @param {Number} max
 * @returns {DOMPoint[]}
 */
export function correctPolygonCornersMinDistance(points, start, max) {
    const math = Math;
    let a = math.atan2(points[0].y - points[1].y, points[1].x - points[0].x);
    let d = math.max(pointDistance(points[1], points[0]), pointDistance(points[3], points[0]));
    d = math.min(math.max(start - d / 2, 0), max);
    const pi4 = Math.PI / 4;
    let fn = (point, factor) => pointCreate(
        point.x + d * math.cos(a + pi4 * factor),
        point.y - d * math.sin(a + pi4 * factor)
    );
    let result = [];
    result.push(fn(points[0], 3));
    result.push(fn(points[1], 1));
    result.push(fn(points[2], -1));
    result.push(fn(points[3], -3));
    return result;
}
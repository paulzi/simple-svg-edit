const doc   = document;
const xmlns = 'http://www.w3.org/2000/svg';

/**
 * Shorthand document.createElement
 * @param {String} tag
 * @param {Boolean} [isSvg]
 * @param {String[]} [cls]
 */
export function createElement(tag, isSvg, cls) {
    let result = isSvg ? doc.createElementNS(xmlns, tag) : doc.createElement(tag);
    if (tag === 'svg') {
        result.setAttribute('xmlns', xmlns);
    }
    cls && cls.forEach(item => {
        result.classList.add(item);
    });
    return result;
}

/**
 * @param {NodeList} list
 * @returns {Array}
 */
export function listToArray(list) {
    return Array.prototype.slice.call(list);
}
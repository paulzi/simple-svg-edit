import closest from 'polyshim/shim/closest';

/**
 * @param {Event} target
 * @param {string} selector
 * @returns {?Element}
 */
export default function eventContext(event, selector) {
    const target = event.target;
    if (target instanceof Element) {
        return closest.call(target, selector);
    }
    return null;
}
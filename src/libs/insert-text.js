import {createElement} from './misc';
import {Editor} from '../classes/Editor';

/**
 * @param   {String} text
 * @param   {Object} [params]
 * @returns {SVGTextElement}
 */
Editor.prototype.insertText = function(text, params = {}) {
    let editor = this;
    let element = createElement('text', true);
    text.split("\n").forEach((line, i) => {
        if (i > 0) {
            let tspan = createElement('tspan', true);
            tspan.textContent = line;
            tspan.setAttribute('x', params.x || 0);
            tspan.setAttribute('dy', '1em');
            element.appendChild(tspan);
        } else {
            element.appendChild(document.createTextNode(line));
        }
    });
    element.setAttribute('x', params.x || 0);
    element.setAttribute('y', params.y || 0);
    let context = params.context || editor.svg;
    let beforeInsert = params.beforeInsert;
    beforeInsert && beforeInsert(image, context, params);
    context.appendChild(element);
    let bound = params.bound;
    if (bound) {
        let rect = element.getBBox();
        let x = bound.x + (bound.width  - rect.width)  / 2;
        let y = bound.y + (bound.height - rect.height) / 2;
        element.setAttribute('x', x);
        element.setAttribute('y', y);
        element.querySelectorAll('tspan').forEach(tspan => {
            tspan.setAttribute('x', x);
        });
    }
    editor.selectElement(element);
    return element;
};

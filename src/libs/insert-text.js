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
    let context = params.context || editor.svg;
    element.setAttribute('x', params.x || 0);
    element.setAttribute('y', params.y || 0);
    context.appendChild(element);
    return element;
};

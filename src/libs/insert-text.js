import {createElement} from './misc';
import {Editor} from '../classes/Editor';
import {textSet} from './text';

/**
 * @param   {String} text
 * @param   {Object} [params]
 * @returns {SVGTextElement}
 */
Editor.prototype.insertText = function(text, params = {}) {
    let editor = this;
    let element = createElement('text', true);
    element.setAttribute('x', params.x || 0);
    element.setAttribute('y', params.y || 0);
    textSet(element, text);
    let context = params.context || editor.svg;
    let beforeInsert = params.beforeInsert;
    beforeInsert && beforeInsert(element, context, params);
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
    let afterInsert = params.afterInsert;
    afterInsert && afterInsert(element, context, params);
    if (params.selectAfterInsert) {
        editor.selectElement(element);
    }
    if (editor.historyPush) {
        editor.historyPush({undo, redo, element, context});
    }
    return element;
};

/**
 * @param {Editor} editor 
 * @param {Object} data 
 */
function undo(editor, data) {
    data.element.parentNode.removeChild(data.element);
    editor.selectElement(null);
    editor.refreshHelper();
}

/**
 * @param {Editor} editor 
 * @param {Object} data 
 */
function redo(editor, data) {
    data.context.appendChild(data.element);
    editor.selectElement(null);
    editor.refreshHelper();
}

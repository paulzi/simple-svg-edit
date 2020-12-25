import {createElement, listToArray} from './misc';
import {Editor} from '../classes/Editor';

/**
 */
export function textOperationsRegister() {
    Editor.prototype.textSetStyle = setStyle;
}

/**
 * @returns {Element[]}
 */
function normalizeSelection() {
    let result = [];
    let sel = window.getSelection();
    for (let i = 0; i < sel.rangeCount; i++) {
        let range = sel.getRangeAt(i);
        let start = range.startContainer;
        if (start === range.endContainer && start.nodeType === Node.TEXT_NODE
            && range.startOffset === 0 && start.nodeValue.length === range.endOffset
        ) {
            result.push(start.parentNode);
        } else {
            let fragment = range.extractContents();
            listToArray(fragment.childNodes).forEach(child => {
                let span;
                if (child.nodeType === Node.TEXT_NODE) {
                    span = createElement('span');
                    fragment.replaceChild(span, child);
                    span.appendChild(child);
                }
                if (child.nodeType === Node.ELEMENT_NODE) {
                    span = child;
                }
                if (span) {
                    result.push(span);
                }
            });
            range.insertNode(fragment);
        }
    }
    return result;
}

/**
 * Join similar elements
 * @param {Element[]} list 
 */
function joinSpan(list) {
    list = list.slice()
    let last = list[list.length - 1].nextSibling;
    last && list.push(last);
    list.forEach(item => {
        let prev = item.previousSibling;
        if (prev.nodeName === item.nodeName && prev.getAttribute('style') === item.getAttribute('style')) {
            listToArray(item.childNodes).forEach(child => {
                prev.appendChild(child);
            });
            item.parentNode.removeChild(item);
        }
    });
}

/**
 * Set style of selected text
 * @param {Function} callback
 */
function setStyle(callback) {
    let list = normalizeSelection();
    list.forEach(callback);
    joinSpan(list);
}
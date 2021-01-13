import eventContext from './event-context';
import {createElement, setTransform, listToArray} from './misc';
import {helperRemove, helperGetPointsForItem} from './helper';
import {pointCreate, pointCenter, pointDistance} from './point';
import {unitsRootToViewport} from './units';
import {Editor, settings} from '../classes/Editor';

// minify
const doc = document;

const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1;

/**
 * Register drag event listener
 */
export function textRegister() {
    const base = settings.base;
    const addEventListener = doc.addEventListener;
    addEventListener.call(doc, 'click',                onClick);
    addEventListener.call(doc, 'input',                onInput);
    addEventListener.call(doc, `${base}Select`,        onSelect);
    addEventListener.call(doc, `${base}DragStart`,     onDragStart);
    addEventListener.call(doc, `${base}RefreshHelper`, onRefreshHelper);
}


/**
 * click event handler
 * @param {Event} e 
 */
function onClick(e) {
    const sel = '.' + settings.base;
    let el = eventContext(e, sel);
    let editor = el && Editor.getInstance(el);
    if (editor) {
        el = eventContext(e, `${sel}__text`);
        el && editInSelection(editor);
    }
}

/**
 * input event handler
 * @param {Event} e 
 */
function onInput(e) {
    const sel = '.' + settings.base;
    let el = eventContext(e, sel);
    let editor = el && Editor.getInstance(el);
    if (editor) {
        let target = e.target;
        if (target.closest(`${sel}__textarea`)) {
            textHelperUpdate(editor);
        }
    }
}

/**
 * {base}Select event handler
 */
function onSelect(e) {
    let editor = e.detail.editor;
    if (editor.foreign) {
        foreignObjectApply(editor);
    }
}

/**
 * {base}DragStart event handler
 * @param {CustomEvent} e 
 */
function onDragStart(e) {
    const sel = '.' + settings.base;
    if (eventContext(e.detail.event, `${sel}__text-width`)) {
        e.detail.operation = dragTextWidth;
    }
}

/**
 * {base}RefreshHelper event handler
 * @param {CustomEvent} e 
 */
function onRefreshHelper(e) {
    let editor = e.detail.editor;
    if (editor.foreign) {
        e.preventDefault();
        textHelperUpdate(editor);
    }
}

/**
 * Start edit text in selection
 * @param {Editor} editor 
 */
function editInSelection(editor) {
    let node = editor.selection[0];
    if (node && node.nodeName === 'text') {
        foreignObjectCreate(editor, node);
        helperRemove(editor);
        textHelperCreate(editor);
    }        
}

/**
 * Create foreignObject for WYSIWYG text edit
 * @param   {Editor} editor
 * @param   {SVGElement} node
 * @returns {SVGElement}
 */
function foreignObjectCreate(editor, node) {
    const base = settings.base;
    let bound = node.getBBox();
    let foreignGroup = createElement('g', true, [`${base}__foreign`]);
    let foreign = createElement('foreignObject', true);
    ['x', 'y', 'width', 'height'].forEach(prop => {
        foreign.setAttribute(prop, bound[prop]);
    });
    let textarea = createElement('span', false, [`${base}__textarea`]);
    convertSvgTextToHtml(node, textarea);
    textarea.contentEditable = true;
    
    let style = getComputedStyle(node);
    let def   = getComputedStyle(node.parentNode);
    let saveProps = [
        'letter-spacing',
        'opacity',
    ];
    Object.values(style).forEach(prop => {
        if (prop.slice(0, 5) === 'font-' || saveProps.indexOf(prop) !== -1) {
            if (style[prop] !== def[prop]) {
                textarea.style[prop] = style[prop];
            }
        }
    });
    
    foreignGroup.appendChild(foreign);
    foreign.appendChild(textarea);
    node.insertAdjacentElement('afterend', foreignGroup);
    removeManualBr(textarea);
    setTransform(foreignGroup, style.transform);
    node.style.display = 'none';
    selectAll(textarea);
    
    editor.foreign       = foreign;
    editor.textarea      = textarea;
    editor.text          = node;
    editor.triggerEvent('TextEdit');
}

/**
 * Apply content from foreignObject to SVG text
 * @param {Editor} editor 
 */
function foreignObjectApply(editor) {
    let foreign  = editor.foreign;
    let textarea = editor.textarea;
    let text     = editor.text;
    let prev     = text.innerHTML;
    let foreignGroup = foreign.parentNode;
    setTransform(foreignGroup, '');
    findAndSplitMultipleLines(textarea);
    convertBrToDiv(textarea);
    convertHtmlToSvgText(text, textarea);
    text.style.display = '';
    editor.triggerEvent('TextApply');
    foreignGroup.parentNode.removeChild(foreignGroup);
    editor.foreign  = null;
    editor.textarea = null;
    editor.text     = null;
    let next = text.innerHTML;
    if (editor.historyPush && prev !== next) {
        editor.historyPush({undo, redo, text, prev, next});
    }
}

/**
 * Convert SVG <text> to HTML
 * @param {SVGElement} text 
 * @param {HTMLElement} textarea 
 */
function convertSvgTextToHtml(text, textarea) {
    textarea.innerHTML = text.innerHTML;
    convertSvgTextToHtmlWalk(textarea);
}

/**
 * Recursive DOM walker to convert SVG <text> to HTML
 * @param {Node} node 
 */
function convertSvgTextToHtmlWalk(node) {
    if (node.nodeName === 'TSPAN') {
        if (node.getAttribute('dy') === '1em') {
            node.insertAdjacentHTML('afterend', '<br/>' + node.innerHTML);
            node.parentNode.removeChild(node);
            node.innerHTML = '';
        } else {
            let replace = document.createElement('span');
            let skip = ['x', 'y', 'dx', 'dy', 'fill'];
            for (let i = 0, len = node.attributes.length; i < len; i++) {
                let attr = node.attributes[i];
                if (skip.indexOf(attr.name) === -1) {
                    replace.setAttribute(attr.name, attr.value);
                }
                if (attr.name === 'fill') {
                    replace.style.color = attr.value;
                }
            }
            if (node.style.fill) {
                replace.style.color = node.style.fill;
            }
            replace.innerHTML = node.innerHTML;
            node.parentNode.replaceChild(replace, node);
            node = replace;
        }
    }
    for (let i = 0; i < node.childNodes.length; i++) {
        convertSvgTextToHtmlWalk(node.childNodes[i]);
    }
}

/**
 * Convert HTML to SVG <text>
 * @param {SVGElement} text
 * @param {HTMLElement} textarea
 */
function convertHtmlToSvgText(text, textarea) {
    convertHtmlToSvgTextWalk(text, textarea, true);
    text.innerHTML = textarea.innerHTML;
}

/**
 * Recursive DOM walker to convert HTML to SVG <text>
 * @param {Node} node 
 * @param {SVGElement} text
 * @param {Boolean} [isRoot]
 */
function convertHtmlToSvgTextWalk(text, node, isRoot) {
    if (node.nodeName === 'DIV') {
        let replace = createElement('tspan');
        replace.setAttribute('x', text.getAttribute('x'));
        replace.setAttribute('dy', '1em');
        replace.innerHTML = node.innerHTML;
        node.parentNode.replaceChild(replace, node);
        node = replace;
    }
    if (node.nodeName === 'SPAN' && !isRoot) {
        let replace = createElement('tspan');
        for (let i = 0, len = node.attributes.length; i < len; i++) {
            let attr = node.attributes[i];
            replace.setAttribute(attr.name, attr.value);
        }
        if (node.style.color) {
            replace.style.fill = node.style.color;
        }
        replace.innerHTML = node.innerHTML;
        node.parentNode.replaceChild(replace, node);
        node = replace;
    }
    for (let i = 0; i < node.childNodes.length; i++) {
        convertHtmlToSvgTextWalk(text, node.childNodes[i]);
    }
}

/**
 * Return text node client rects
 * @param {Text} node
 * @returns {DOMRect[]}
 */
function getTextClientRects(node) {
    let range = doc.createRange();
    range.selectNodeContents(node);
    return range.getClientRects();
}

/**
 * Return element or text node client rect
 * @param {Node} node
 * @returns {?DOMRect}
 */
function getNodeClientRect(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return getTextClientRects(node)[0];
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
        return node.getBoundingClientRect();
    }
    return null;
}

/**
 * Remove manual placed <br> back to multiline
 * @param {Node} node
 */
function removeManualBr(node) {
    if (node.nodeName === 'BR') {
        let next = node.nextSibling;
        let bound = getNodeClientRect(next);
        if (bound) {
            node.parentNode.removeChild(node);
            let boundNew = getNodeClientRect(next);
            if (boundNew.y !== bound.y) {
                next.parentNode.insertBefore(node, next);
            }
        }
    }
    listToArray(node.childNodes).forEach(child => {
        removeManualBr(child);
    });
}

/**
 * Find multiple lines texts and split by <br>
 * @param {Node} node 
 */
function findAndSplitMultipleLines(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let isSplit = false;
        let y = null;
        listToArray(getTextClientRects(node)).forEach(rect => {
            if (y !== null && rect.y > y) {
                isSplit = true;
            }
            y = rect.y;
        });
        if (isSplit) {
            splitTextByLines(node);
        }
    }
    listToArray(node.childNodes).forEach((child) => {
        findAndSplitMultipleLines(child);
    });
    let prev = null;
    listToArray(node.childNodes).forEach((child) => {
        let bound;
        if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== '') {
            bound = getTextClientRects(child)[0];
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.nodeName === 'BR') {
                prev = null;
            } else {
                bound = child.getBoundingClientRect();
            }
        }
        if (bound) {
            if (prev !== null && bound.y > prev.y && bound.width > 0) {
                node.insertBefore(createElement('br'), child);
            }
            prev = bound;
        }
    });
}

/**
 * Split multiple lines text by <br>
 * @param {Text} node 
 */
function splitTextByLines(node) {
    let content = node.textContent;
    let y, rect;
    let range = doc.createRange();
    let splits = [];
    for (let i = 0; i < content.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        rect = range.getBoundingClientRect();
        if (y === undefined) {
            y = rect.y;
        }
        if (rect.y !== y) {
            splits.push(i);
            y = rect.y;
        }
    }
    splits.reverse().forEach(idx => {
        range.setStart(node, idx);
        range.setEnd(node, idx);
        range.insertNode(createElement('br'));
    });
}

/**
 * Convert <br> to <div> wrapped texts
 * @param {Node} node 
 */
function convertBrToDiv(node) {
    let stack = [];
    listToArray(node.childNodes).forEach((child, i) => {
        if (child.nodeName === 'BR') {
            stack.push([child]);
        } else {
            if (stack.length > 0) {
                stack[stack.length - 1].push(child);
            }
        }
    });
    stack.forEach(items => {
        let div = createElement('div');
        let br = items.shift();
        node.replaceChild(div, br);
        items.forEach(child => {
            div.appendChild(child);
        });
    });
    listToArray(node.childNodes).forEach(child => {
        convertBrToDiv(child);
    });
}

/**
 * Select all
 * @param {Node} node 
 */
function selectAll(node) {
    node.focus();
    let range = document.createRange();
    range.selectNodeContents(node);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

/**
 * Create text helper for foreignObject
 * @param {Editor} editor 
 */
function textHelperCreate(editor) {
    let foreign = editor.foreign;
    let foreignGroup = foreign.parentNode;
    let boundItem = isSafari ? foreignGroup : foreign;
    let points = editor.helperPoints = helperGetPointsForItem(editor, foreignGroup, boundItem);
    textHelperCreateByPoints(editor, points);
}

/**
 * Create helper by corner points
 * @param {Editor} editor
 * @param {DOMPoint[]} points
 */
function textHelperCreateByPoints(editor, points) {
    if (!settings.createTextHelper) {
        throw new Error('createTextHelper is not set');
    }
    let helper = settings.createTextHelper(editor, points);
    editor.helper = helper;
    editor.helpers.appendChild(helper);
}

/**
 * Update foreignObject size and text helper
 * @param {Editor} editor 
 */
function textHelperUpdate(editor) {
    helperRemove(editor);
    editor.foreign.setAttribute('height', editor.textarea.clientHeight);
    textHelperCreate(editor);
}

/**
 * On drag text width
 * @param {MouseEvent|TouchEvent} e
 * @param {Object} current
 */
function dragTextWidth(e, current) {
    let editor = current.editor;
    let point = pointCenter([editor.helperPoints[0], editor.helperPoints[3]]);
    point = unitsRootToViewport(editor, point);
    let r1 = pointDistance(pointCreate(e.clientX, e.clientY), point);
    let r0 = pointDistance(pointCreate(current.x, current.y), point);
    let scale = r1 / r0;
    if (current.initialWidth === undefined) {
        let bound = editor.foreign.getBBox();
        current.initialWidth = bound.width;
    }
    editor.foreign.setAttribute('width', current.initialWidth * scale);
    textHelperUpdate(editor);
}

/**
 * Apply drag undo
 * @param {Editor} editor
 * @param {Object} data 
 */
function undo(editor, data) {
    data.text.innerHTML = data.prev;
    editor.refreshHelper();
}

/**
 * Apply drag redo
 * @param {Editor} editor
 * @param {Object} data 
 */
function redo(editor, data) {
    data.text.innerHTML = data.next;
    editor.refreshHelper();
}
import eventContext from './event-context';
import {matrixGetTranformForElement} from './matrix';
import {Editor, settings} from '../classes/Editor';

// minify
const doc = document;

// vars
let map = {left: 'start', center: 'middle', right: 'end'};
let mapBack = Object.keys(map).reduce((res, key) => {
    res[map[key]] = key;
    return res;
}, {});

/**
 * Register drag event listener
 */
export function textAlignRegister() {
    const base = settings.base;
    const addEventListener = doc.addEventListener;
    addEventListener.call(doc, 'click',            onClick);
    addEventListener.call(doc, `${base}TextEdit`,  onTextEdit);
    addEventListener.call(doc, `${base}TextApply`, onTextApply);
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
        if (eventContext(e, `${sel}__align-left`)) {
            editor.textarea.style.textAlign = 'left';
        }
        if (eventContext(e, `${sel}__align-center`)) {
            editor.textarea.style.textAlign = 'center';
        }
        if (eventContext(e, `${sel}__align-right`)) {
            editor.textarea.style.textAlign = 'right';
        }
    }
}

/**
 * {base}TextEdit event handler
 * @param {CustomEvent} e 
 */
function onTextEdit(e) {
    let editor = e.detail.editor;
    let anchor = getComputedStyle(editor.text).textAnchor;
    editor.textarea.style.textAlign = mapBack[anchor];
}

/**
 * {base}TextApply event handler
 * @param {CustomEvent} e 
 */
function onTextApply(e) {
    let editor = e.detail.editor;
    let text = editor.text;
    let anchor = getComputedStyle(text).textAnchor;
    let align  = editor.textarea.style.textAlign || 'left';
    let mapWidth = {start: 0, middle: 0.5, end: 1};
    align = map[align];
    if (anchor !== align) {
        let width = text.getBBox().width;
        let fx = mapWidth[align] - mapWidth[anchor];
        text.style.textAnchor = align;
        text.style.transform = matrixGetTranformForElement(text)
            .translateSelf(fx * width, 0)
            .toString();
    }
}

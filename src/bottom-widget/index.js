import eventContext from '../libs/event-context';
import {settings, Editor} from '../classes/Editor';
import {createElement} from '../libs/misc';

// minify
const doc = document;

/**
 * Register widget listener
 */
export function bottomWidgetRegister() {
    const base = settings.base;
    const addEventListener = doc.addEventListener;
    addEventListener.call(doc, 'click',         onClick);
    addEventListener.call(doc, `${base}Inited`, onInited);
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
        el = eventContext(e, `${sel}__insert-text`);
        el && editor.insertText("text", findArea(sel, editor));
        el = eventContext(e, `${sel}__insert-image`);
        el && editor.insertImageUpload(findArea(sel, editor));
    }
}

/**
 * @param {CustomEvent} e 
 */
function onInited(e) {
    const base = settings.base;
    let params = e.detail;
    let editor = params.editor;
    if (params.insertWidget !== false) {
        let widget = createElement('g', true, [`${base}__bottom`]);
        let html = `
            <g class="${base}__bottom-image">
                <g class="${base}__act _insert-image ${base}__insert-image" tabindex="0">
                    <circle r="20"/>
                    <g class="${base}__icon">
                        <path d="M7-9.5H-7A2.5,2.5,0,0,0-9.5-7V7A2.5,2.5,0,0,0-7,9.5H7A2.5,2.5,0,0,0,9.5,7V-7A2.5,2.5,0,0,0,7-9.5ZM-8.5,7V-7A1.5,1.5,0,0,1-7-8.5H7A1.5,1.5,0,0,1,8.5-7V1.79L4.35-2.35a.48.48,0,0,0-.7,0L-7.19,8.48A1.49,1.49,0,0,1-8.5,7ZM7,8.5H-5.79L4-1.29l4.5,4.5V7A1.5,1.5,0,0,1,7,8.5ZM-3.5-1.5a2,2,0,0,0,2-2,2,2,0,0,0-2-2,2,2,0,0,0-2,2A2,2,0,0,0-3.5-1.5Zm0-3a1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1A1,1,0,0,1-3.5-4.5Z"/>
                    </g>
                </g>
            </g>
            <g class="${base}__bottom-text">
                <g class="${base}__act _insert-text ${base}__insert-text" tabindex="0">
                    <circle r="20"/>
                    <g class="${base}__icon">
                        <path d="M8.5-8v3a.5.5,0,0,1-.5.5A.5.5,0,0,1,7.5-5V-7.5H.5v15H3a.5.5,0,0,1,0,1H-3A.5.5,0,0,1-3.5,8,.5.5,0,0,1-3,7.5H-.5v-15h-7V-5a.5.5,0,0,1-.5.5A.5.5,0,0,1-8.5-5V-8A.5.5,0,0,1-8-8.5H8A.5.5,0,0,1,8.5-8Z"/>
                    </g>
                </g>
            </g>
            <g class="${base}__act _insert" tabindex="0">
                <circle r="30"/>
                <g class="${base}__icon">
                    <path d="M8.5,0A.5.5,0,0,1,8,.5H.5V8a.5.5,0,0,1-.5.5A.5.5,0,0,1-.5,8V.5H-8A.5.5,0,0,1-8.5,0,.5.5,0,0,1-8-.5H-.5V-8A.5.5,0,0,1,0-8.5.5.5,0,0,1,.5-8V-.5H8A.5.5,0,0,1,8.5,0Z"/>
                </g>
            </g>
        `;
        if (editor.historyPush) {
            html += `
                <g class="${base}__bottom-undo">
                    <g class="${base}__act _undo ${base}__undo" tabindex="0">
                        <circle r="16"/>
                        <g class="${base}__icon">
                            <path d="M7,2a.51.51,0,0,1-.7-.11S3.3-2.27.05-2.27C-2.38-2.27-4.68,0-5.7,1.18h3.38a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H-6.77a.5.5,0,0,1-.5-.5V-2.77a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5V.32C-5.09-1-2.66-3.27.05-3.27c3.76,0,7,4.34,7.08,4.52A.51.51,0,0,1,7,2Z"/>
                        </g>
                    </g>
                </g>
                <g class="${base}__bottom-redo">
                    <g class="${base}__act _redo ${base}__redo" tabindex="0">
                        <circle r="16"/>
                        <g class="${base}__icon">
                            <path d="M7.28-2.72V1.71a.5.5,0,0,1-.5.5H2.35a.5.5,0,0,1,0-1H5.71C4.7.05,2.41-2.22,0-2.22c-3.23,0-6.21,4.05-6.24,4.09a.51.51,0,0,1-.7.11.51.51,0,0,1-.11-.7c.13-.18,3.31-4.5,7.05-4.5C2.69-3.22,5.1-1,6.28.35V-2.72a.5.5,0,0,1,.5-.5A.5.5,0,0,1,7.28-2.72Z"/>
                        </g>
                    </g>
                </g>
            `;
        }
        widget.innerHTML = html;
        editor.helpers.appendChild(widget);
    }
}

/**
 * 
 * @param {String} sel 
 * @param {Editor} editor 
 * @returns {Object}
 */
function findArea(sel, editor) {
    let zone = editor.svg.querySelector(sel + '__area-zone');
    return {
        context: editor.svg.querySelector(sel + '__area'),
        bound:   zone && zone.getBBox(),
    };
}
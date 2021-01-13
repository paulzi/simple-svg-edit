import eventContext from '../libs/event-context';
import {settings, Editor} from '../classes/Editor';

// minify
const doc = document;

/**
 * Register
 */
export function historyRegister() {
    doc.addEventListener('click', onClick);
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
        el = eventContext(e, `${sel}__undo`);
        el && editor.undo();
        el = eventContext(e, `${sel}__redo`);
        el && editor.redo();
    }
}

/**
 * @param {Object} item
 */
Editor.prototype.historyPush = function(item) {
    let cur = this._history    || [];
    let pos = this._historyPos || 0;
    cur.splice(pos);
    this._history    = cur;
    this._historyPos = cur.push(item);
};

/**
 */
Editor.prototype.undo = function() {
    let editor = this;
    let item = editor._history[(editor._historyPos || 0) - 1];
    if (item) {
        item.undo(editor, item);
        editor._historyPos--;
    }
};

/**
 */
Editor.prototype.redo = function() {
    let editor = this;
    let item = editor._history[editor._historyPos || 0];
    if (item) {
        item.redo(editor, item);
        editor._historyPos++;
    }
};
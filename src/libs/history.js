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
 * @param {Editor} editor 
 * @returns {Object}
 */
function getEventDetail(editor) {
    return {
        position: editor._historyPos,
        length: editor._history.length,
    };
}

/**
 * @param {Object} item
 */
Editor.prototype.historyPush = function(item) {
    let editor = this;
    let cur = editor._history    || [];
    let pos = editor._historyPos || 0;
    cur.splice(pos);
    editor._history    = cur;
    editor._historyPos = cur.push(item);
    editor.triggerEvent('HistoryPush', getEventDetail(editor));
    editor.triggerEvent('Changed');
};

/**
 */
Editor.prototype.undo = function() {
    let editor = this;
    let item = editor._history[(editor._historyPos || 0) - 1];
    if (item) {
        item.undo(editor, item);
        editor._historyPos--;
        editor.triggerEvent('HistoryUndo', getEventDetail(editor));
        editor.triggerEvent('Changed');
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
        editor.triggerEvent('HistoryRedo', getEventDetail(editor));
        editor.triggerEvent('Changed');
    }
};
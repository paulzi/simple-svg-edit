import eventContext from '../libs/event-context';
import {createElement} from '../libs/misc';
import {helperCreate, helperRemove} from '../libs/helper';
import {dragRegister} from '../libs/drag';

// minify
const doc = document;

// vars
let instances = new Map();

// settings
export const settings = {
    base: 'sse',
    createHelper: null,
};

/**
 * Trigger editor event
 * @param {Editor} editor
 * @param {String} type
 * @param {?Object} [detail]
 * @returns {Boolean}
 */
function triggerEvent(editor, type, detail) {
    let event = new CustomEvent(settings.base + type, {
        bubbles: true,
        cancelable: true,
        detail: Object.assign(detail || {}, {editor}),
    });
    editor.root.dispatchEvent(event);
    return event.defaultPrevented;
}

/**
 * Wrap SVG in editor element
 * @param {Editor} editor
 * @param {Element} el
 */
function prepareSvg(editor, el) {
    const base = settings.base;
    editor.svg = el;
    let root = editor.root = createElement('svg', true, [base]);
    el.parentNode.replaceChild(editor.root, el);
    root.appendChild(el);
    editor.helpers = createElement('g', true, [`${base}__helpers`]);
    root.appendChild(editor.helpers);
}

/**
 * Refresh root viewBox for 1:1 helpers size
 * @param {Element} root
 */
function refreshRootViewBox(root) {
    let bound = root.getBoundingClientRect();
    root.setAttribute('viewBox', `0 0 ${bound.width} ${bound.height}`);
}

/**
 * Register event listeners
 */
function registerListeners() {
    const addEventListener = doc.addEventListener;
    addEventListener.call(doc,    'click',      onClick);
    addEventListener.call(doc,    'mousedown',  onMouseDown);
    addEventListener.call(doc,    'touchstart', onMouseDown);
    addEventListener.call(window, 'resize',     onResize);
    dragRegister();
}

/**
 * @param {Event} e 
 */
function onClick(e) {
    const sel = '.' + settings.base;
    let el = eventContext(e, sel);
    let editor = el && Editor.getInstance(el);
    if (editor) {
        el = eventContext(e, `${sel}__delete`);
        el && editor.deleteSelectedElements();
    }
}

/**
 * @param {MouseEvent|TouchEvent} e 
 */
function onMouseDown(e) {
    const sel = '.' + settings.base;
    let el = eventContext(e, sel);
    let editor = el && Editor.getInstance(el);
    if (editor) {
        let target = e.target;
        if (editor.svg.contains(target)) {
            if (target.nodeName === 'tspan') {
                target = target.closest('text');
            }
            if (!target.closest('foreignObject')) {
                editor.selectElement(target);
            }
        }
        if (target === el) {
            editor.selectElement(null);
        }
    }
}

/**
 */
function onResize() {
    instances.forEach(editor => {
        refreshRootViewBox(editor.root);
        editor.refreshHelper();
    });
}


export class Editor {
    /**
     * @param {HTMLElement} el
     */
    constructor(el) {
        prepareSvg(this, el);
        instances.set(this.root, this);
        this.helper    = null;
        this.selection = [];
        registerListeners();
        refreshRootViewBox(this.root);
    }

    /**
     * Destroy editor and apply changes
     */
    destroy() {
        instances.delete(this.root);
        this.root.parentNode.replaceChild(this.svg);
    }

    /**
     * Trigger editor event and return isDefaultPrevented
     * @param {String} type
     * @param {?Object} [detail]
     * @returns {Boolean}
     */
    triggerEvent(type, detail) {
        return triggerEvent(this, type, detail);
    }

    /**
     * Select element
     * @param {SVGElement|null} el 
     */
    selectElement(el) {
        let newSelection = el ? [el] : [];
        let prevented = triggerEvent(this, 'Select', {
            cur: this.selection,
            new: newSelection,
        });
        if (!prevented) {
            this.selection = newSelection;
            this.refreshHelper();
        }
    }

    /**
     * Refresh helper
     */
    refreshHelper() {
        if (!triggerEvent(this, 'RefreshHelper')) {
            helperRemove(this);
            helperCreate(this);
        }
    }

    /**
     * Delete current selected elements
     */
    deleteSelectedElements() {
        helperRemove(this);
        this.selection.forEach(item => {
            item.parentNode.removeChild(item);
        });
        this.selection = [];
    }

    /**
     * Get Editor instance by SVG element
     * @param {Element} el 
     * @returns {?Editor}
     */
    static getInstance(el) {
        return instances.get(el);
    }
}
import eventContext from '../libs/event-context';
import {createElement} from '../libs/misc';
import {helperCreate, helperRemove} from '../libs/helper';
import {dragRegister, transformElements} from '../libs/drag';
import {rectBoundingClientRectMultiple} from '../libs/rect';
import {unitsViewportToLocal} from '../libs/units';

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
 * @param {?EventTarget} [target]
 * @returns {Boolean}
 */
function triggerEvent(editor, type, detail, target) {
    let event = new CustomEvent(target ? type : settings.base + type, {
        bubbles: true,
        cancelable: true,
        detail: Object.assign(detail || {}, {editor}),
    });
    (target || editor.root).dispatchEvent(event);
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
    root.setAttribute('viewBox', el.getAttribute('viewBox'));
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
 * @param {Editor} editor
 * @param {Object} data
 */
function undoDelete(editor, data) {
    data.list.forEach(item => {
        item.parent.insertBefore(item.element, item.before);
    });
    editor.selectElement(null);
    editor.refreshHelper();
}

/**
 * @param {Editor} editor
 * @param {Object} data
 */
function redoDelete(editor, data) {
    data.list.forEach(item => {
        let element = item.element;
        element.parentNode.removeChild(element);
    });
    editor.selectElement(null);
    editor.refreshHelper();
}

/**
 * @param {SVGElement} node 
 * @returns {SVGElement|null}
 */
function findRootEditable(node) {
    const base = settings.base;
    let attr = `data-${base}-editable`;
    let sel = `[${attr}="true"],[${attr}="1"]`;
    let next = node.closest(sel);
    if (!next) {
        return next;
    }
    let cur;
    do {
        cur = next;
        next = cur.parentNode && cur.parentNode.closest(sel);
    } while (next);
    return cur;
}

/**
 * @param {Editor} editor 
 * @param {SVGElement} node 
 * @param {SVGElement} root 
 * @returns {SVGElement}
 */
function findGroup(editor, node, root) {
    let next = node;
    let cur;
    do {
        cur = next;
        next = cur.parentNode && cur.parentNode.closest(editor.groupSelector);
    } while (next && root.contains(next) && root !== next);
    return cur;
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
        el && editor.deleteSelection();
    }
}

/**
 * @param {MouseEvent|TouchEvent} e 
 */
function onMouseDown(e) {
    const base = settings.base;
    const sel  = '.' + base;
    let el = eventContext(e, sel);
    let editor = el && Editor.getInstance(el);
    if (editor) {
        let target = e.target;
        if (editor.svg.contains(target)) {
            if (target.nodeName === 'tspan') {
                target = target.closest('text');
            }
            let attr = `data-${base}-editable`;
            let editable = target.closest(`[${attr}]`);
            editable = editable && editable.getAttribute(attr);
            if (editable === 'true' || editable === '1') {
                if (!target.closest('foreignObject')) {
                    let root = findRootEditable(target);
                    let group = findGroup(editor, target, root);
                    editor.selectElement(group);
                }
            } else {
                editor.selectElement(null);
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
     * @param {SVGSVGElement} el
     * @param {Object} [params]
     */
    constructor(el, params = {}) {
        prepareSvg(this, el);
        instances.set(this.root, this);
        this.helper    = null;
        this.selection = [];
        this.groupSelector = params.groupSelector || 'g';
        registerListeners();
        refreshRootViewBox(this.root);
        triggerEvent(this, 'inited', params, Editor.events);
        triggerEvent(this, 'Inited', params);
    }

    /**
     * Refresh editor
     * @returns {Editor} this
     */
    refresh() {
        refreshRootViewBox(this.root);
        this.refreshHelper();
        return this;
    }

    /**
     * Destroy editor and apply changes
     */
    destroy() {
        instances.delete(this.root);
        this.root.parentNode.replaceChild(this.svg, this.root);
    }

    /**
     * Trigger editor event and return isDefaultPrevented
     * @param {String} type
     * @param {Object} [detail]
     * @returns {Boolean}
     */
    triggerEvent(type, detail) {
        return triggerEvent(this, type, detail);
    }

    /**
     * Select element
     * @param {?SVGElement} el 
     * @returns {Boolean}
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
        return prevented;
    }

    /**
     * Refresh helper position and size
     * @returns {Editor} this
     */
    refreshHelper() {
        if (!triggerEvent(this, 'RefreshHelper')) {
            helperRemove(this);
            helperCreate(this);
        }
        return this
    }

    /**
     * @param {SVGElement[]} elements
     * @param {Boolean} [useBBox]
     * @returns {DOMRect}
     */
     getBoundingBox(elements, useBBox) {
        let bound = rectBoundingClientRectMultiple(elements, useBBox);
        return useBBox ? bound : unitsViewportToLocal(this, bound);
    }

    /**
     * @param {SVGElement} element
     * @param {DOMMatrix} matrix
     * @returns {Editor} this
     */
    setTransform(element, matrix) {
        transformElements(this, [element], matrix, true);
        return this;
    }

    /**
     * Transform elements
     * @param {SVGElement[]} elements
     * @param {DOMMatrix} matrix
     * @param {?DOMMatrix} [preMatrix]
     * @returns {Editor} this
     */
    transformElements(elements, matrix, preMatrix) {
        transformElements(this, elements, matrix, preMatrix);
        return this;
    }

    /**
     * Transform selection
     * @param {DOMMatrix} matrix 
     * @param {DOMMatrix} [preMatrix]
     * @returns {Editor} this
     */
    transformSelection(matrix, preMatrix) {
        transformElements(this, this.selection, matrix, preMatrix);
        return this;
    }

    /**
     * Delete elements
     * @param {SVGElement[]} elements
     * @returns {Editor} this
     */
    deleteElements(elements) {
        helperRemove(this);
        let list = [];
        elements.forEach(item => {
            list.push({
                element: item,
                parent: item.parentNode,
                before: item.nextSibling,
            });
            item.parentNode.removeChild(item);
        });
        list = list.sort((a, b) => b.nextSibling === a ? 1 : 0);
        if (this.historyPush) {
            this.historyPush({undo: undoDelete, redo: redoDelete, list});
        }
        let length = this.selection.length;
        this.selection = this.selection.filter(item => elements.indexOf(item) === -1);
        if (length !== this.selection.length) {
            this.selectElement(this.selection[0]);
        }
        return this;
    }

    /**
     * Delete current selected elements
     */
    deleteSelection() {
        this.deleteElements(this.selection);
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

Editor.events = doc.createTextNode(null);
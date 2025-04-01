import {createElement} from './misc';
import {Editor} from '../classes/Editor';

const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1;

/**
 * @param   {String} text
 * @param   {Object} [params]
 * @returns {SVGImageElement}
 */
Editor.prototype.insertImageUrl = function(url, params = {}) {
    let editor = this;
    let image = createElement('image', true);
    let img = new Image();
    img.onload = function() {
        ['x', 'y', 'width', 'height'].forEach(attr => {
            if (params[attr] !== undefined) {
                image.setAttribute(attr, params[attr]);
            }
        });
        let context = params.context || editor.svg;
        let beforeInsert = params.beforeInsert;
        beforeInsert && beforeInsert(image, context, img, params);
        context.appendChild(image);
        let bound = params.bound;
        if (bound) {
            let scale = Math.min(bound.width / img.naturalWidth, bound.height / img.naturalHeight);
            let w = img.naturalWidth  * scale;
            let h = img.naturalHeight * scale;
            let x = bound.x + (bound.width  - w) / 2;
            let y = bound.y + (bound.height - h) / 2;
            image.setAttribute('x',      x);
            image.setAttribute('y',      y);
            image.setAttribute('width',  w);
            image.setAttribute('height', h);
        }
        let afterInsert = params.afterInsert;
        afterInsert && afterInsert(image, context, img, params);
        if (params.selectAfterInsert) {
            editor.selectElement(image);
        }
        if (editor.historyPush) {
            editor.historyPush({undo, redo, element: image, context});
        }
    };
    img.src = url;
    image.setAttribute('href', url);
    return image;
};

/**
 * @param {Object} params
 */
Editor.prototype.insertImageUpload = function(params = {}) {
    let input;
    if (isSafari) {
        input = this.root.querySelector('input[type="file"]') || createElement('input');
    } else {
        input = createElement('input');
    }
    input.type = 'file';
    input.onchange = async () => {
        let file = input.files[0];
        let detail = {file};
        this.triggerEvent('ImageUpload', detail);
        file = detail.file;
        if (file) {
            if (params.afterUpload) {
                file = await params.afterUpload(file);
            }
            if (typeof file === 'string') {
                this.insertImageUrl(file, params);
            } else if (params.blobUrl) {
                this.insertImageUrl(URL.createObjectURL(file), params);
            } else {
                var reader = new FileReader();
                reader.onload = () => {
                    this.insertImageUrl(reader.result, params);
                };
                reader.readAsDataURL(file);
            }
        }
    };
    if (isSafari) {
        // hack for iOs safari - onchange is not work if input is not in DOM
        input.setAttribute('style', 'visibility:hidden;width:0;height:0');
        this.root.appendChild(input);
    }
    input.click();
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

import {createElement} from './misc';
import {Editor} from '../classes/Editor';

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
        beforeInsert && beforeInsert(image, context, params);
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
        editor.selectElement(image);
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
    let input = createElement('input');
    input.type = 'file';
    input.onchange = () => {
        let file = input.files[0];
        let detail = {file};
        this.triggerEvent('ImageUpload', detail);
        file = detail.file;
        if (file) {
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
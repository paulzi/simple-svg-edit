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
    image.onload = function() {
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
            let rect = image.getBBox();
            let scale = Math.min(bound.width / rect.width, bound.height / rect.height);
            let w = rect.width  * scale;
            let h = rect.height * scale;
            let x = bound.x + (bound.width  - w) / 2;
            let y = bound.y + (bound.height - h) / 2;
            image.setAttribute('x',      x);
            image.setAttribute('y',      y);
            image.setAttribute('width',  w);
            image.setAttribute('height', h);
        }
        editor.selectElement(image);
    };
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
        let fileFilter = params.fileFilter;
        if (fileFilter) {
            file = fileFilter(file, params);
        }
        if (file) {
            if (params.blobUrl) {
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
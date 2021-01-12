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
    image.setAttribute('href', url);
    ['x', 'y', 'width', 'height'].forEach(attr => {
        if (params[attr] !== undefined) {
            image.setAttribute(attr, params[attr]);
        }
    });
    let context = params.context || editor.svg;
    let beforeInsert = params.beforeInsert;
    beforeInsert && beforeInsert(image, context, params);
    context.appendChild(image);
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
# Documentation

Simple SVG edit documentation.

## `editor`

Main functionality.

Special css-classes:

`${base}__move` - this class in the helper will move the svg element;
`${base}__scale` - this class in the helper will scale the svg element;
`${base}__rotate` - this class in the helper will rotate the svg element;
`${base}__delete` - this class in the helper will delete the svg element;

Exports:

- `Editor {Editor}` - editor class;
    - `constructor(el[, params])` - create new `Editor`;
        - `el {SVGSVGElement}` - editable `<svg>` element;
        - `params: {} {Object}` - additional params (used in fetures);
    - `helpers {SVGGElement}` - element `<g>` of container for helpers;
    - `helper {SVGElement}` - current element control helper;
    - `helperPoints {DOMPoint[]}` - current helper corner points;
    - `root {SVGSVGElement}` - editor `<svg>` element;
    - `selection {SVGElement[]}` - array of selected elements;
    - `svg {SVGSVGElement}` - editable `<svg>` element;
    - `static getInstance(el)` - get `Editor` instance by root editor `<svg>` element;
        - `el {SVGSVGElement}` - root svg element;
        - `@returns {?Editor}`;
    - `refresh()` - refresh editor sizes;
        - `@returns {Editor}` - this;
    - `destroy()` - destroy editor;
    - `triggerEvent(type[, detail])` - trigger new event with custom data;
        - `type {String}` - type of event;
        - `detail: {} {Object}` - custom data;
        - `@returns {Boolean}` - is prevented event;
    - `selectElement(el)` - select element in editable svg;
        - `el {?SVGElement}` - svg element;
        - `@returns {Boolean}` - is prevented selection;
    - `refreshHelper()` - refresh helper position and size;
        - `@returns {Editor}` - this;
    - `getBoundingBox(elements[, useBBox])` - get elements bounding box;
        - `elements {SVGElement[]}` - elements;
        - `useBBox {Boolean}` - use getBBox() calculation;
        - `@returns {DOMRect}` - bounding box;
    - `setTransform(element, matrix)` - set element transformation;
        - `element {SVGElement}` - target element;
        - `matrix {DOMMatrix}` - transformation matrix;
        - `@returns {Editor}` - this;
    - `transformElements(elements, matrix[, preMatrix])` - apply transformation for elements;
        - `elements {SVGElement[]}` - target elements;
        - `matrix {DOMMatrix}` - transformation matrix;
        - `preMatrix {?DOMMatrix}` - use pre-apply transformation;
        - `@returns {Editor}` - this;
    - `transformSelection(elements, matrix[, preMatrix])` - apply transformation for selection;
        - `matrix {DOMMatrix}` - transformation matrix;
        - `preMatrix {?DOMMatrix}` - use pre-apply transformation;
        - `@returns {Editor}` - this;
    - `deleteElements(elements)` - delete elements;
        - `elements {SVGElement[]}` - target elements;
        - `@returns {Editor}` - this;
    - `deleteSelection()` - delete selection;
        - `@returns {Editor}` - this;
- `settings {Object}` - settings
    - `base: 'sse' {String}` - base namespace of component;
    - `createHelper: null {?Function(editor, points)}` - your function creating element control helper;
        - `editor {Editor}` - editor;
        - `points {DOMPoint[]}` - corner points of element control helper in editor coordinate system;

## `default-helper`

Provide build-in element control helper.

Need to include `default-helper.scss`.

## `text`

Allow to edit text. Required to set `settings.createTextHelper` or include `features/default-text-helper`.

Special css-classes:

`${base}__text` - this class in the helper will start text edit the svg element;
`${base}__text-width` - this class in the text helper will change text width of svg element.

Extend `Editor`:

- `foreign {SVGGElement}` - `<g>` element of WYSIWYG text editor;
- `foreignObject {SVGForeignObjectElement}` - `<foreignObject>` element of WYSIWYG text editor;
- `text {SVGTextElement}` - current editable `<text>`;
- `textarea {HTMLDivElement}` - `contentEditable` element in `<foreignObject>`;
- `textSet(element, text)` -  set svg text content via HTML;
    - `element {SVGTextElement}` - target text element;
    - `text {String}` - text content;
    - `@returns {Editor}` - this;

Extend settings:

- `createTextHelper: null {?Function(editor, points)}` - your function creating text control helper;
    - `editor {Editor}` - editor;
    - `points {DOMPoint[]}` - corner points of element control helper in editor coordinate system;

## `default-text-helper`

Provide build-in text control helper.

## `text-align`

Allow to change text-align editable `<text>`.

Special css-classes:

`${base}__align-left` - this class in the text helper will align text to the left;
`${base}__align-center` - this class in the text helper will align text to the center;
`${base}__align-right` - this class in the text helper will align text to the right.

## `text-operations`

Allow to change style of selected text in WYSIWYG text editor.

Extend `Editor`:

- `textSetStyle(callback)` - change style of selected text;
    - `callback {Function(node)}` - callback function called for every selected element;
        - `node {SVGElement}` - selected element.

## `align`

Align objects relative another.

Extend `Editor`:

- `align(targets, x, y[, params])` - align target objects;
    - `targets {SVGElement[]}` - target elements;
    - `x {?Number}` - horizontal align value (0 - left, 1 - right, null - skip align);
    - `y {?Number}` - vertical align value (0 - left, 1 - right, null - skip align);
    - `params: {} {Object}` - additional params;
        - `context {SVGElement}` - relative align object (default sse__zone or svg element);
        - `bound {DOMRect}` - relative bound object;
    - `@returns {Editor} this`;
- `alignSelection(x, y[, params])` - align selection (see align()).

## `transform-helper`

Provide transormation methods.

Extend `Editor`:

- `getTranslation(element)` - get transform translation of element;
    - `element {SVGElement}` - target element;
    - `@returns {DomPoint}`;
- `getScale(element)` - get transform scale of element;
    - `element {SVGElement}` - target element;
    - `@returns {DomPoint}`;
- `getRotation(element)` - get transform rotation of element;
    - `element {SVGElement}` - target element;
    - `@returns {Number}`;
- `getSkew(element)` - get transform skew of element;
    - `element {SVGElement}` - target element;
    - `@returns {Number}`;
- `setTranslation(element, x, y)` - set transform translation of element;
    - `element {SVGElement}` - target element;
    - `x {Number}` - x;
    - `y {Number}` - y;
    - `@returns {Editor}` this;
- `setScale(element, x[, y])` - set transform scale of element;
    - `element {SVGElement}` - target element;
    - `x {Number}` - x;
    - `y {Number}` - y;
    - `@returns {Editor}` this;
- `setRotation(element, angle)` - set transform rotation of element;
    - `element {SVGElement}` - target element;
    - `angle {Number}` - angle;
    - `@returns {Editor}` this;
- `setSkew(element, angle)` - set transform skew of element;
    - `element {SVGElement}` - target element;
    - `angle {Number}` - angle;
    - `@returns {Editor}` this;
- `translate(element, x, y)` - translate elements;
    - `elements {SVGElement[]}` - target elements;
    - `x {Number}` - x;
    - `y {Number}` - y;
    - `@returns {Editor}` this;
- `scale(element, x[, y, asGroup])` - scale elements;
    - `elements {SVGElement[]}` - target elements;
    - `x {Number}` - x;
    - `y {Number}` - y;
    - `asGroup: true {Boolean}` - transform as group or individual;
    - `@returns {Editor}` this;
- `rotate(element, angle[, asGroup])` - rotate elements;
    - `elements {SVGElement[]}` - target elements;
    - `angle {Number}` - angle;
    - `asGroup: true {Boolean}` - transform as group or individual;
    - `@returns {Editor}` this;
- `skew(element, angle[, asGroup])` - skew elements;
    - `elements {SVGElement[]}` - target elements;
    - `angle {Number}` - angle;
    - `asGroup: true {Boolean}` - transform as group or individual;
    - `@returns {Editor}` this;

## `insert-image`

Provide insert image methods.

Extend `Editor`:

- `insertImageUrl(url[, params = {}])` - insert image by url;
    - `url {String}` - url of image;
    - `params: {} {Object}` - additional params;
        - `x {Number}` - x attribute;
        - `y {Number}` - y attribute;
        - `width {Number}` - width attribute;
        - `height {Number}` - height attribute;
        - `context {SVGElement}` - insert context (default svg);
        - `bound {DOMRect}` - insert bound zone;
        - `beforeInsert: Function(image, context, img, params)` - callback function before insert in svg;
            - `image {SVGImageElement}` - image element;
            - `context {SVGElement}` - target context;
            - `img {Image}` - image (naturalWidth/naturalHeight properties);
            - `params {Object}` - params;
        - `afterInsert: Function(image, context, img, params)` - callback function after insert in svg (see beforeInsert);
        - `selectAfterInsert {Boolean}` - select element after insert;
- `insertImageUpload([params = {}])` - upload file from computer and insert in svg;
    - `params: {} {Object}` - additional params;
        - see `insertImageUrl` params;
        - `blobUrl {Boolean}` - insert image as blob url, otherwise as data:uri base64;

## `insert-text`

Provide insert text methods.

Extend `Editor`:

- `insertText(text[, params = {}])` - insert image by url;
    - `text {String}` - text content (allow html);
    - `params: {} {Object}` - additional params;
        - `x {Number}` - x attribute;
        - `y {Number}` - y attribute;
        - `context {SVGElement}` - insert context (default svg);
        - `bound {DOMRect}` - insert bound zone;
        - `beforeInsert: Function(element, context, params)` - callback function before insert in svg;
            - `element {SVGTextElement}` - text element;
            - `context {SVGElement}` - target context;
            - `params {Object}` - params;
        - `afterInsert: Function(image, context, params)` - callback function after insert in svg (see beforeInsert);
        - `selectAfterInsert {Boolean}` - select element after insert;
        
## `bottom-widget`

Provide build-in insert image/text widget.

Need to include `bottom-widget.scss`.

## `history`

Undo/redo functionality.

Extend `Editor`:

- `undo()` - undo last operation;
    - `@returns {Boolean}` - has operation or history is empty;
- `redo()` - redo last operation;
    - `@returns {Boolean}` - has operation or history is empty;
- `historyPush(item)` - insert action in history;
    - `item {Object}`
        - `undo {Function(editor, item)}` - undo function;
        - `redo {Function(editor, item)}` - redo function;
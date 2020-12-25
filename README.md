# Simple SVG editor

Simple SVG editor - move, scale, rotate elements and text edit.

## Usage

If you are using build system, include the functionality you need from folder `features`, and start edit svg:

```javascript
import {Editor} from 'simple-svg-edit/features/editor';
import 'simple-svg-edit/features/default-helper';
import 'simple-svg-edit/features/text';
import 'simple-svg-edit/features/default-text-helper';

let editor = new Editor(document.querySelector('svg'));
```

Some functionality requires to use styles (include sass or dist/css):

```scss
@import '~simple-svg-edit/features/default-helper';
```

Or just use ready compiled files from folder `dist`:

```html
<!DOCTYPE html>
<html>
  <head>
    <link href="../dist/simple-svg-editor.css" rel="stylesheet">
  </head>
  <body>
    <div class="root">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- svg here--></svg>
    </div>
    <script src="../dist/simple-svg-editor.js"></script>
    <script>new SimpleSvgEditor(document.querySelector('svg'));</script>
  </body>
</html>
```

## Features

### `editor`

Main functionality.

Special css-classes:

`${base}__move` - this class in the helper will move the svg element;
`${base}__scale` - this class in the helper will scale the svg element;
`${base}__rotate` - this class in the helper will rotate the svg element;
`${base}__delete` - this class in the helper will delete the svg element;

Exports:

- `Editor {Editor}` - editor class;
    - `constructor(el)` - create new `Editor`;
        - `el {Element}` - editable `<svg>` element;
    - `root {Element}` - editor `<svg>` element;
    - `svg {Element}` - editable `<svg>` element;
    - `helpers {SVGElement}` - element `<g>` of container for helpers;
    - `helper {SVGElement}` - current element control helper;
    - `helperPoints {DOMPoint[]}` - current helper corner points;
    - `selection {SVGElement[]}` - array of selected elements;
    - `destroy()` - destroy editor;
    - `triggerEvent(type[, detail])` - trigger new event with custom data;
        - `type {String}` - type of event;
        - `detail: {} {Object}` - custom data;
    - `selectElement(el)` - select element in editable svg;
        - `el {SVGElement}` - svg element;
    - `refreshHelper()` - refresh helper position and size;
    - `deleteSelectedElements()` - delete current selected elements;
    - `static getInstance(el)` - get `Editor` instance by root editor `<svg>` element;
- `settings {Object}` - settings
    - `base: 'sse' {String}` - base namespace of component;
    - `createHelper: null {?Function(editor, points)}` - your function creating element control helper;
        - `editor {Editor}` - editor;
        - `points {DOMPoint[]}` - corner points of element control helper in editor coordinate system;

### `default-helper`

Provide build-in element control helper.

### `text`

Allow to edit text. Required to set `settings.createTextHelper` or include `features/default-text-helper`.

Special css-classes:

`${base}__text` - this class in the helper will start text edit the svg element;
`${base}__text-width` - this class in the text helper will change text width of svg element.

Extend `Editor`:

- `foreign {SVGElement}` - `<foreignObject>` element of WYSIWYG text editor;
- `text {SVGElement}` - current editable `<text>`;
- `textarea {Element}` - `contentEditable` element in `<foreignObject>`.

Extend settings:

- `createTextHelper: null {?Function(editor, points)}` - your function creating text control helper;
    - `editor {Editor}` - editor;
    - `points {DOMPoint[]}` - corner points of element control helper in editor coordinate system;

### `default-text-helper`

Provide build-in text control helper.

### `text-align`

Allow to change text-align editable `<text>`.

Special css-classes:

`${base}__align-left` - this class in the text helper will align text to the left;
`${base}__align-center` - this class in the text helper will align text to the center;
`${base}__align-right` - this class in the text helper will align text to the right.

### `text-operations`

Allow to change style of selected text in WYSIWYG text editor.

Extend `Editor`:

- `textSetStyle(callback)` - change style of selected text;
    - `callback(node) {Function}` - callback function called for every selected element;
        - `node {Element}` - selected element.


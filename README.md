# Simple SVG editor

Simple SVG editor - move, scale, rotate elements and text edit.

[DEMO](https://paulzi.github.io/simple-svg-edit/index.html)

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

- `editor` - main functionality editor class;
- `default-helper` - provide build-in element control helper;
- `text` - allow to edit text;
- `default-text-helper` - provide build-in text control helper;
- `text-align` - allow to change text-align editable `<text>`;
- `text-operations` - allow to change style of selected text in WYSIWYG text editor;
- `align` - align objects relative another;
- `transform-helper` - provide transormation methods;
- `insert-image` - provide insert image methods;
- `insert-text` - provide insert text methods;
- `bottom-widget` - provide build-in insert control widget;
- `history` - undo/redo;

## Documentation

[Read documentation](https://github.com/paulzi/simple-svg-edit/blob/master/documentation.md)
# ColorPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/color-picker.svg)](https://www.npmjs.com/package/@pluginjs/color-picker)

A flexible modern color-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/color-picker/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/color-picker
```

#### NPM

```javascript
npm i @pluginjs/color-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ColorPicker from "@pluginjs/color-picker"
import "@pluginjs/color-picker/dist/color-picker.css"

ColorPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/color-picker/dist/color-picker.css")
const ColorPicker = require("@pluginjs/color-picker")

ColorPicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.css">
<script src="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.js"></script>
<script>
  Pj.colorPicker('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/color-picker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/color-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
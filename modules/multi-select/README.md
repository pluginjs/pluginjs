# MultiSelect

[![npm package](https://img.shields.io/npm/v/@pluginjs/multi-select.svg)](https://www.npmjs.com/package/@pluginjs/multi-select)

A flexible modern multi-select js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/multiSelect/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/multi-select
```

#### NPM

```javascript
npm i @pluginjs/multi-select
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/multi-select/dist/multi-select.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/multi-select/dist/multi-select.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/multi-select/dist/multi-select.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/multi-select/dist/multi-select.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import MultiSelect from "@pluginjs/multi-select"
import "@pluginjs/multi-select/dist/multi-select.css"

MultiSelect.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/multi-select/dist/multi-select.css")
const MultiSelect = require("@pluginjs/multi-select")

MultiSelect.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/multi-select/dist/multi-select.css">
<script src="https://unpkg.com/@pluginjs/multi-select/dist/multi-select.js"></script>
<script>
  Pj.multiSelect('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/multi-select is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/multi-select project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
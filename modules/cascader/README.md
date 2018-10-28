# Cascader

[![npm package](https://img.shields.io/npm/v/@pluginjs/cascader.svg)](https://www.npmjs.com/package/@pluginjs/cascader)

A flexible modern cascader js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/cascader/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/cascader
```

#### NPM

```javascript
npm i @pluginjs/cascader
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/cascader/dist/cascader.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/cascader/dist/cascader.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/cascader/dist/cascader.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/cascader/dist/cascader.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Cascader from "@pluginjs/cascader"
import "@pluginjs/cascader/dist/cascader.css"

Cascader.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/cascader/dist/cascader.css")
const Cascader = require("@pluginjs/cascader")

Cascader.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/cascader/dist/cascader.css">
<script src="https://unpkg.com/@pluginjs/cascader/dist/cascader.js"></script>
<script>
  Pj.Cascader('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/cascader is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/cascader project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
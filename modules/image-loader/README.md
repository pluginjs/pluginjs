# ImageLoader

[![npm package](https://img.shields.io/npm/v/@pluginjs/image-loader.svg)](https://www.npmjs.com/package/@pluginjs/image-loader)

A flexible modern image-loader js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/imageLoader/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/image-loader
```

#### NPM

```javascript
npm i @pluginjs/image-loader
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.min.js"></script>
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ImageLoader from "@pluginjs/image-loader"
import "@pluginjs/image-loader/dist/image-loader.css"

ImageLoader.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/image-loader/dist/image-loader.css")
const ImageLoader = require("@pluginjs/image-loader")

ImageLoader.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.css">
<script src="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.js"></script>
<script>
  Pj.imageLoader('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/image-loader is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/image-loader project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
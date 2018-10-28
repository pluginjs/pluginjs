# Thumbnails

[![npm package](https://img.shields.io/npm/v/@pluginjs/thumbnails.svg)](https://www.npmjs.com/package/@pluginjs/thumbnails)

A flexible modern thumbnails js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/thumbnails/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/thumbnails
```

#### NPM

```javascript
npm i @pluginjs/thumbnails
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/thumbnails/dist/thumbnails.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/thumbnails/dist/thumbnails.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/thumbnails/dist/thumbnails.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/thumbnails/dist/thumbnails.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Thumbnails from "@pluginjs/thumbnails"
import "@pluginjs/thumbnails/dist/thumbnails.css"

Thumbnails.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/thumbnails/dist/thumbnails.css")
const Thumbnails = require("@pluginjs/thumbnails")

Thumbnails.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/thumbnails/dist/thumbnails.css">
<script src="https://unpkg.com/@pluginjs/thumbnails/dist/thumbnails.js"></script>
<script>
  Pj.thumbnails('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/thumbnails is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/thumbnails project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
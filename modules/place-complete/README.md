# PlaceComplete

[![npm package](https://img.shields.io/npm/v/@pluginjs/place-complete.svg)](https://www.npmjs.com/package/@pluginjs/place-complete)

A flexible modern place-complete js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/placeComplete/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/place-complete
```

#### NPM

```javascript
npm i @pluginjs/place-complete
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/place-complete/dist/place-complete.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/place-complete/dist/place-complete.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/place-complete/dist/place-complete.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/place-complete/dist/place-complete.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import PlaceComplete from "@pluginjs/place-complete"
import "@pluginjs/place-complete/dist/place-complete.css"

PlaceComplete.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/place-complete/dist/place-complete.css")
const PlaceComplete = require("@pluginjs/place-complete")

PlaceComplete.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/place-complete/dist/place-complete.css">
<script src="https://unpkg.com/@pluginjs/place-complete/dist/place-complete.js"></script>
<script>
  Pj.placeComplete('.element', options)
</script>
```
## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/place-complete is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/place-complete project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
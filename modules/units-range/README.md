# UnitsRange

[![npm package](https://img.shields.io/npm/v/@pluginjs/units-range.svg)](https://www.npmjs.com/package/@pluginjs/units-range)

A flexible modern units-range js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/unitsRange/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/units-range
```

#### NPM

```javascript
npm i @pluginjs/units-range
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/units-range/dist/units-range.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/units-range/dist/units-range.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/units-range/dist/units-range.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/units-range/dist/units-range.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import UnitsRange from "@pluginjs/units-range"
import "@pluginjs/units-range/dist/units-range.css"

UnitsRange.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/units-range/dist/units-range.css")
const UnitsRange = require("@pluginjs/units-range")

UnitsRange.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/units-range/dist/units-range.css">
<script src="https://unpkg.com/@pluginjs/units-range/dist/units-range.js"></script>
<script>
  Pj.unitsRange('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/units-range is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/units-range project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
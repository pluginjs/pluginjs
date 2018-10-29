# Magnify

[![npm package](https://img.shields.io/npm/v/@pluginjs/magnify.svg)](https://www.npmjs.com/package/@pluginjs/magnify)

A flexible modern magnify js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/magnify/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/magnify
```

#### NPM

```javascript
npm i @pluginjs/magnify
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/magnify/dist/magnify.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/magnify/dist/magnify.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/magnify/dist/magnify.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/magnify/dist/magnify.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Magnify from "@pluginjs/magnify"
import "@pluginjs/magnify/dist/magnify.css"

Magnify.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/magnify/dist/magnify.css")
const Magnify = require("@pluginjs/magnify")

Magnify.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/magnify/dist/magnify.css">
<script src="https://unpkg.com/@pluginjs/magnify/dist/magnify.js"></script>
<script>
  Pj.magnify('.element', options)
</script>
```
## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/magnify is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/magnify project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
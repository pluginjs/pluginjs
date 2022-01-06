# Infinite

[![npm package](https://img.shields.io/npm/v/@pluginjs/infinite.svg)](https://www.npmjs.com/package/@pluginjs/infinite)

A flexible modern infinite js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/infinite/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/infinite
```

#### NPM

```javascript
npm i @pluginjs/infinite
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/infinite/dist/infinite.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/infinite/dist/infinite.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/infinite/dist/infinite.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/infinite/dist/infinite.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Infinite from "@pluginjs/infinite"
import "@pluginjs/infinite/dist/infinite.css"

Infinite.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/infinite/dist/infinite.css")
const Infinite = require("@pluginjs/infinite")

Infinite.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/infinite/dist/infinite.css">
<script src="https://unpkg.com/@pluginjs/infinite/dist/infinite.js"></script>
<script>
  Pj.infinite('.element', options)
</script>
```

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/infinite is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/infinite project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
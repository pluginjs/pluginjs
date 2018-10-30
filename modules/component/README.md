# Component

[![npm package](https://img.shields.io/npm/v/@pluginjs/component.svg)](https://www.npmjs.com/package/@pluginjs/component)

A flexible modern component js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/component/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/component
```

#### NPM

```javascript
npm i @pluginjs/component
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/component/dist/component.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/component/dist/component.min.js"></script>
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Component from "@pluginjs/component"

Component.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
const Component = require("@pluginjs/component")

Component.of(document.querySelector('.element'), options)
```

Browser:

```html
<script src="https://unpkg.com/@pluginjs/component/dist/component.js"></script>
<script>
  Pj.component('.element', options)
</script>
```

## API

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/component is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/component project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
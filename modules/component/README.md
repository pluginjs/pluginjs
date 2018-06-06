# Component
[![npm package](https://img.shields.io/npm/v/@pluginjs/component.svg)](https://www.npmjs.com/package/@pluginjs/component)

A flexible modern component js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/component/samples)**

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
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/component/dist/component.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/component/dist/component.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/component/dist/component.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/component/dist/component.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
ECMAScript Module:
```javascript
import Component from "@pluginjs/component"
import "@pluginjs/component/dist/component.css"

Component.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/component/dist/component.css")
const Component = require("@pluginjs/component")

Component.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/component/dist/component.css">
  <script async src="https://unpkg.com/@pluginjs/component/dist/component.js"></script>
</head>
```
```javascript
Pj.component('.element', options);
```
---
## API


### Methods:
Methods are called on component instances through the component method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"getDataOptions"` | Make plugin themeable




---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/component is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/component project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
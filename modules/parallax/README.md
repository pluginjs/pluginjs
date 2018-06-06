# Parallax
[![npm package](https://img.shields.io/npm/v/@pluginjs/parallax.svg)](https://www.npmjs.com/package/@pluginjs/parallax)

A flexible modern parallax js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/parallax/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/parallax
```
#### NPM
```javascript
npm i @pluginjs/parallax
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/parallax/dist/parallax.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/parallax/dist/parallax.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/parallax/dist/parallax.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/parallax/dist/parallax.min.css">
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
import Parallax from "@pluginjs/parallax"
import "@pluginjs/parallax/dist/parallax.css"

Parallax.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/parallax/dist/parallax.css")
const Parallax = require("@pluginjs/parallax")

Parallax.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/parallax/dist/parallax.css">
  <script async src="https://unpkg.com/@pluginjs/parallax/dist/parallax.js"></script>
</head>
```
```javascript
Pj.parallax('.element', options);
```
---
## API

### Options:
Options are called on parallax instances through the parallax options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"speed"` | Set speed | `1000`
`"delayType"` | Set delayType | `throttle`
`"delay"` | Set delay | `100`
`"offset"` | Set offset | `0`
`"mode"` | Set mode | `translateX`
`"max"` | Set max | `null`
`"min"` | Set min | `null`

### Events:
Events are called on parallax instances through the parallax events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"enter"` | Gets fired when plugin has enter


### Methods:
Methods are called on parallax instances through the parallax method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"setAnimation"` | Set value of setAnimation
`"setAnimationDelay"` | Set value of setAnimationDelay
`"beforeLoad"` | Set value of beforeLoad
`"afterLoad"` | Set value of afterLoad
`"load"` | Set value of load
`"isLoad"` | Set value of isLoad
`"setDelay"` | Get setdelay function




---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/parallax is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/parallax project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
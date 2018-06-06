# Slider
[![npm package](https://img.shields.io/npm/v/@pluginjs/slider.svg)](https://www.npmjs.com/package/@pluginjs/slider)

A flexible modern slider js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/slider/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/slider
```
#### NPM
```javascript
npm i @pluginjs/slider
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/slider/dist/slider.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/slider/dist/slider.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/slider/dist/slider.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/slider/dist/slider.min.css">
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
import Slider from "@pluginjs/slider"
import "@pluginjs/slider/dist/slider.css"

Slider.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/slider/dist/slider.css")
const Slider = require("@pluginjs/slider")

Slider.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/slider/dist/slider.css">
  <script async src="https://unpkg.com/@pluginjs/slider/dist/slider.js"></script>
</head>
```
```javascript
Pj.slider('.element', options);
```
---
## API

### Options:
Options are called on slider instances through the slider options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"direction"` | Set direction | `horizontal`

### Events:
Events are called on slider instances through the slider events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"show"` | Gets fired when plugin has show
`"hide"` | Gets fired when plugin has hide


### Methods:
Methods are called on slider instances through the slider method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"show"` | Announce plugin is show
`"hide"` | Announce plugin is hide
`"goNext"` | Destroy goNext
`"goPrev"` | Destroy goPrev
`"autoPlay"` | Destroy autoPlay
`"setAutoPlayCycle"` | Destroy setAutoPlayCycle
`"setAnimation"` | Destroy setAnimation
`"setSpecPage"` | Destroy setSpecPage


### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-slider`
`"CONTAINER"` | Declare plugin range | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ITEM"` | Declare ITEM | `{namespace}`
`"VERTICAL"` | Declare plugin vertical | `{namespace}-vertical`
`"HORIZONTAL horizontal"` | Declare plugin  | `{namespace}-horizontal`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"HIDDEN"` | Announce plugin is hidden | `{namespace}-hidden`


### Translations:
Name | EN | ZH
-----|------|-------
`"prev"` | Last page | 上一页
`"next"` | Next page | 下一页


### Dependencies:
- `[object Object]`
- `[object Object]`

---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/slider is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/slider project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
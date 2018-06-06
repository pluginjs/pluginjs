# ImageSelector
[![npm package](https://img.shields.io/npm/v/@pluginjs/image-selector.svg)](https://www.npmjs.com/package/@pluginjs/image-selector)

A flexible modern image-selector js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/imageSelector/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/image-selector
```
#### NPM
```javascript
npm i @pluginjs/image-selector
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.min.css">
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
import ImageSelector from "@pluginjs/image-selector"
import "@pluginjs/image-selector/dist/image-selector.css"

ImageSelector.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/image-selector/dist/image-selector.css")
const ImageSelector = require("@pluginjs/image-selector")

ImageSelector.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.css">
  <script async src="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.js"></script>
</head>
```
```javascript
Pj.imageSelector('.element', options);
```
---
## API

### Options:
Options are called on imageSelector instances through the imageSelector options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"disabled"` | Disabled plugin | `false`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set plugin is localeFallbacks or not  | `true`
`"data"` | Set plugin data option | `null`
`"hideOutClick"` | Set plugin is hideOutClick or not  | `true`

### Events:
Events are called on imageSelector instances through the imageSelector events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy


### Methods:
Methods are called on imageSelector instances through the imageSelector method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin


### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-imageSelector`
`"INIT"` | Declare plugin init | `{namespace}-init`
`"HIDE"` | Declare plugin hide | `{namespace}-hide`
`"SHOW"` | Declare plugin show | `{namespace}-show`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"DATA"` | Declare plugin data | `{namespace}-data`
`"CHANGE"` | Declare plugin change | `{namespace}-change`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"ITEMLABEL"` | Declare plugin itemlabel | `{namespace}-item-label`
`"SCROLLWRAP"` | Declare plugin scrollwrap | `{namespace}-scroll-wrap`
`"WRAPPER"` | Declare plugin wrapper | `{namespace}-wrapper`
`"MASK"` | Declare plugin mask | `{namespace}-mask`


### Translations:
Name | EN | ZH
-----|------|-------
`"change"` | Change | 改变布局


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
@pluginjs/image-selector is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/image-selector project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
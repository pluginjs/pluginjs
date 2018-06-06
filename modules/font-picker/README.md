# FontPicker
[![npm package](https://img.shields.io/npm/v/@pluginjs/font-picker.svg)](https://www.npmjs.com/package/@pluginjs/font-picker)

A flexible modern font-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/fontPicker/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/font-picker
```
#### NPM
```javascript
npm i @pluginjs/font-picker
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.min.css">
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
import FontPicker from "@pluginjs/font-picker"
import "@pluginjs/font-picker/dist/font-picker.css"

FontPicker.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/font-picker/dist/font-picker.css")
const FontPicker = require("@pluginjs/font-picker")

FontPicker.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.css">
  <script async src="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.js"></script>
</head>
```
```javascript
Pj.fontPicker('.element', options);
```
---
## API

### Options:
Options are called on fontPicker instances through the fontPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"activated"` | Set plugin activated option | `null`
`"disabled"` | Disavled plugin | `false`
`"manage"` | Set plugin manage option | `true`
`"lazyNumber"` | Set plugin lazyNumber option | `12`
`"delay"` | Set plugin delay option | `250`
`"keyboard"` | Set plugin keyboard event | `true`
`"placeholder"` | Set input box prompt information | `choose a font`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events:
Events are called on fontPicker instances through the fontPicker events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"searching"` | Gets fired when plugin has searching


### Methods:
Methods are called on fontPicker instances through the fontPicker method itself.
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
`"NAMESPACE"` | Declare plugin namespace | `pj-fontPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"TRIGGER"` | Declare plugin trigger | `{namespace}-trigger`
`"FONT"` | Declare plugin font | `{namespace}-font`
`"FONTFOCUS"` | Declare plugin fontfocus | `{namespace}-font-focus`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"SOURCES"` | Declare plugin sources | `{namespace}-sources`
`"SOURCEICON"` | Declare plugin source icon | `{namespace}-source-icon`
`"ACTIVATED"` | Declare plugin activated | `{namespace}-activated`
`"FONTWRAP"` | Declare plugin font wrap | `{namespace}-font-wrap`
`"PACKAGE"` | Declare plugin package | `{namespace}-package`
`"PACKAGESWRAP"` | Declare plugin package wrap | `{namespace}-package-wrap`
`"PACKAGETITLE"` | Declare plugin package title | `{namespace}-package-title`
`"PACKAGEOPEN"` | Declare plugin package open | `{namespace}-package-open`
`"PACKAGEHIDE"` | Declare plugin package hide | `{namespace}-package-hide`
`"SEARCH"` | Declare plugin search | `{namespace}-search`
`"SEARCHING"` | Declare plugin searching | `{namespace}-searching`
`"SEARCHED"` | Declare plugin searched | `{namespace}-searched`
`"SEARCHLIST"` | Declare plugin searchlist | `{namespace}-search-list`
`"SEARCHREADY"` | Declare plugin searchready | `{namespace}-search-ready`
`"CONTROLLER"` | Declare plugin controller | `{namespace}-controller`
`"SELECTOR"` | Declare plugin selector | `{namespace}-selector`
`"SELECTORPANEL"` | Declare plugin selector panel | `{namespace}-selector-panel`
`"MANAGE"` | Declare plugin manage | `{namespace}-manage`
`"EMPTY"` | Declare plugin empty | `{namespace}-empty`
`"EMPTYLINK"` | Declare plugin emptylink | `{namespace}-empty-link`


### Translations:
Name | EN | ZH
-----|------|-------
`"searchText"` | Search... | 搜索...
`"manage"` | manage | 管理
`"activatedFonts"` | activated | 已选字体
`"emptyTitle"` | Befor using font, you need add fonts.  | 使用字体之前，请先添加。
`"emptyLinkTitle"` | Go add now | 现在添加


### Dependencies:
- `[object Object]`
- `[object Object]`
- `[object Object]`

---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/font-picker is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/font-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
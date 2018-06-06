# SvgPicker
[![npm package](https://img.shields.io/npm/v/@pluginjs/svg-picker.svg)](https://www.npmjs.com/package/@pluginjs/svg-picker)

A flexible modern svg-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/svgPicker/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/svg-picker
```
#### NPM
```javascript
npm i @pluginjs/svg-picker
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/svg-picker/dist/svg-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/svg-picker/dist/svg-picker.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/svg-picker/dist/svg-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/svg-picker/dist/svg-picker.min.css">
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
import SvgPicker from "@pluginjs/svg-picker"
import "@pluginjs/svg-picker/dist/svg-picker.css"

SvgPicker.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/svg-picker/dist/svg-picker.css")
const SvgPicker = require("@pluginjs/svg-picker")

SvgPicker.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/svg-picker/dist/svg-picker.css">
  <script async src="https://unpkg.com/@pluginjs/svg-picker/dist/svg-picker.js"></script>
</head>
```
```javascript
Pj.svgPicker('.element', options);
```
---
## API

### Options:
Options are called on svgPicker instances through the svgPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"data"` | Set data | `null`
`"keyboard"` | Set keyboard | `false`
`"placehoder"` | Set input box prompt information | `choose a icon`
`"disabled"` | Disabled plugin | `false`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events:
Events are called on svgPicker instances through the svgPicker events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed


### Methods:
Methods are called on svgPicker instances through the svgPicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"add"` | Get value of add


### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-svgPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"TRIGGER"` | Declare plugin trigger | `{namespace}-trigger`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"ICON"` | Declare plugin icon | `{namespace}-icon`
`"ICONWRAP"` | Declare plugin iconwrap | `{namespace}-icon-wrap`
`"ICONHOVER"` | Declare plugin icon hover | `{namespace}-icon-hover`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"EMPTY"` | Declare plugin empty | `{namespace}-empty`
`"ADD"` | Declare plugin add | `{namespace}-add`
`"TYPE"` | Declare plugin type | `{namespace}-type`
`"TYPEWRAP"` | Declare plugin type wrap | `{namespace}-type-wrap`
`"TYPETITLE"` | Declare plugin type etitle | `{namespace}-type-title`
`"TYPEOPEN"` | Declare plugin type open | `{namespace}-type-open`
`"TYPEHIDE"` | Declare plugin type hide | `{namespace}-type-hide`
`"TYPETIP"` | Declare plugin type etip | `{namespace}-type-tip`
`"SEARCH"` | Declare plugin type search | `{namespace}-search`
`"SEARCHING"` | Declare plugin type searching | `{namespace}-searching`
`"SEARCHED"` | Declare plugin searched | `{namespace}-searched`
`"SEARCHCLOSE"` | Declare plugin search lose | `{namespace}-search-close`
`"SEARCHOWNDATA"` | Declare plugin search data | `{namespace}-search-data`
`"MANAGE"` | Declare plugin mange | `{namespace}-manage`
`"MANAGEICON"` | Declare plugin mange icon | `{namespace}-manage-icon`


### Translations:
Name | EN | ZH
-----|------|-------
`"emptyText"` | Befor using SVG icons, you need add icons to &quot;my collections&quot; | 在使用SVG图标之前，您需要添加图标到“我的收藏”
`"emptyHrefText"` | Go add now | 去添加
`"searchText"` | Search | 搜索
`"manage"` | Manage My Collections | 管理我的收藏
`"founded"` | founded | 结果


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
@pluginjs/svg-picker is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/svg-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
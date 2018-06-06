# MapPicker
[![npm package](https://img.shields.io/npm/v/@pluginjs/map-picker.svg)](https://www.npmjs.com/package/@pluginjs/map-picker)

A flexible modern map-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/mapPicker/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/map-picker
```
#### NPM
```javascript
npm i @pluginjs/map-picker
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/map-picker/dist/map-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/map-picker/dist/map-picker.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/map-picker/dist/map-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/map-picker/dist/map-picker.min.css">
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
import MapPicker from "@pluginjs/map-picker"
import "@pluginjs/map-picker/dist/map-picker.css"

MapPicker.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/map-picker/dist/map-picker.css")
const MapPicker = require("@pluginjs/map-picker")

MapPicker.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/map-picker/dist/map-picker.css">
  <script async src="https://unpkg.com/@pluginjs/map-picker/dist/map-picker.js"></script>
</head>
```
```javascript
Pj.mapPicker('.element', options);
```
---
## API

### Options:
Options are called on mapPicker instances through the mapPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"icon"` | Set default icon | `icon-pin-map`
`"disabled"` | Disabled plugin | `false`
`"place"` | Set place | `null`
`"latlng"` | Set latlng | `{}`
`"showLatlng"` | Set the plugin is showLatlng or not | `true`
`"gmapOptions"` | Set gmapOptions | `{&quot;apiKey&quot;:&quot;AIzaSyDSx-q31rWQKqLwUahg6TrZ3R_5NT0LhFE&quot;,&quot;mapTypeControl&quot;:false,&quot;zoomControl&quot;:true,&quot;zoom&quot;:12,&quot;libraries&quot;:&quot;places&quot;}`
`"markerOptions"` | Set markerOptions | `{&quot;draggable&quot;:true}`
`"templates"` | Set default templates | `{}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events:
Events are called on mapPicker instances through the mapPicker events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy


### Methods:
Methods are called on mapPicker instances through the mapPicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin


### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-mapPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"MAP"` | Declare plugin map | `{namespace}-map`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"INIT"` | Declare plugin init | `{namespace}-init`
`"FILL"` | Declare plugin fill | `{namespace}-fill`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"REMOVEANIMATE"` | Announce plugin is removeanimate | `{namespace}-remove-animate`
`"PREVIEW"` | Announce plugin is preview | `{namespace}-preview`
`"PREVIEWACTION"` | Announce plugin is previewaction | `{namespace}-preview-action`
`"PREVIEWCONTENT"` | Announce plugin is previewcontent | `{namespace}-preview-content`
`"PREVIEWNAME"` | Announce plugin is previewname | `{namespace}-preview-name`
`"PREVIEWCOORD"` | Announce plugin is previewcoord | `{namespace}-preview-coord`
`"EDIT"` | Announce plugin is edit | `{namespace}-edit`
`"REMOVE"` | Announce plugin is remove | `{namespace}-remove`
`"ICON"` | Announce plugin is icon | `{namespace}-icon`
`"PANEL"` | Announce plugin is panel | `{namespace}-panel`
`"CONTENT"` | Announce plugin is content | `{namespace}-panel-content`
`"ITEM"` | Announce plugin is item | `{namespace}-item`
`"ITEMTITLE"` | Announce plugin is itemitle | `{namespace}-item-title`
`"LAT"` | Announce plugin is lat | `{namespace}-lat`
`"LNG"` | Announce plugin is lng | `{namespace}-lng`
`"PLACE"` | Announce plugin is place | `{namespace}-place`
`"ACTION"` | Announce plugin is action | `{namespace}-action`
`"CANCEL"` | Announce plugin is cancel | `{namespace}-canel`
`"SAVE"` | Announce plugin is save | `{namespace}-save`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"LOADING"` | Announce plugin is loading | `{namespace}-loading`
`"LOADINGWRAP"` | Announce plugin is loadingwrap | `{namespace}-loading-wrap`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`


### Translations:
Name | EN | ZH
-----|------|-------
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除
`"addPlace"` | Add Places | 添加地址
`"save"` | Save | 保存
`"place"` | Places | 地址
`"latitude"` | Latitude | 纬度
`"longitude"` | Longitude | 经度


### Dependencies:
- `[object Object]`
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
@pluginjs/map-picker is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/map-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
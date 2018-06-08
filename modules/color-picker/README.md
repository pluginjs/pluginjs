# ColorPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/color-picker.svg)](https://www.npmjs.com/package/@pluginjs/color-picker)

A flexible modern color-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/colorPicker/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/color-picker
```

#### NPM

```javascript
npm i @pluginjs/color-picker
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.min.css">
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
import ColorPicker from "@pluginjs/color-picker"
import "@pluginjs/color-picker/dist/color-picker.css"

ColorPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/color-picker/dist/color-picker.css")
const ColorPicker = require("@pluginjs/color-picker")

ColorPicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.css">
  <script async src="https://unpkg.com/@pluginjs/color-picker/dist/color-picker.js"></script>
</head>
```

```javascript
Pj.colorPicker('.element', options);
```

---

## API

### Options

Options are called on colorPicker instances through the colorPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"placeholder"` | Set input box prompt information | `choose color`
`"module"` | Set plugin module option | `[&quot;collection&quot;,&quot;solid&quot;,&quot;gradient&quot;]`
`"solidMode"` | Set plugin solidMode option | `full`
`"solidModule"` | Set plugin solidModile option | `{&quot;saturation&quot;:true,&quot;hue&quot;:true,&quot;alpha&quot;:true,&quot;hex&quot;:true}`
`"gradientMode"` | Set plugin gradientMode option | `linear`
`"defaultColor"` | Set plugin defaultColor option | `#000`
`"data"` | Set plugin data option | `null`
`"color"` | Set plugin color option | `{&quot;format&quot;:false,&quot;alphaConvert&quot;:{&quot;RGB&quot;:&quot;RGBA&quot;,&quot;HSL&quot;:&quot;HSLA&quot;,&quot;HEX&quot;:&quot;RGBA&quot;,&quot;NAMESPACE&quot;:&quot;RGBA&quot;},&quot;shortenHex&quot;:false,&quot;hexUseName&quot;:false,&quot;reduceAlpha&quot;:true,&quot;nameDegradation&quot;:&quot;HEX&quot;,&quot;invalidValue&quot;:&quot;&quot;,&quot;zeroAlphaAsTransparent&quot;:true}`
`"manage"` | Set plugin manage option | `function() {...}`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events

Events are called on colorPicker instances through the colorPicker events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"openPanel"` | Gets fired when plugin has openPanel
`"switchModule"` | Gets fired when plugin has switchModule

### Methods

Methods are called on colorPicker instances through the colorPicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"get"` | Get value by key
`"set"` | Set value by key
`"update"` | Update plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-colorPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"TRIGGER"` | Declare plugin trigger | `{namespace}-trigger`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"INPUT"` | Declare plugin input | `{namespace}-input`
`"REMOVE"` | Declare plugin remove | `{namespace}-remove`
`"MASK"` | Declare plugin mask | `{namespace}-mask`
`"PREVIEW"` | Declare plugin preview | `{namespace}-preview`
`"PREVIEWCOLOR"` | Declare plugin preview color | `{namespace}-preview-color`
`"PREVIEWBG"` | Declare plugin preview bg | `{namespace}-preview-bg`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"OPENPANEL"` | Declare plugin open | `{namespace}-open`
`"PANELWRAP"` | Declare plugin panel wrap | `{namespace}-panel-wrap`
`"PANELTRIGGER"` | Declare plugin panel trigger | `{namespace}-panel-trigger`
`"PANELTRIGGERCOLLECTION"` | Declare plugin panel trigger collection | `{namespace}-panel-trigger-collection`
`"PANELTRIGGERSOLID"` | Declare plugin panel trigger solid | `{namespace}-panel-trigger-solid`
`"PANELTRIGGERGRADIENT"` | Declare plugin panel trigger gradient | `{namespace}-panel-trigger-gradient`
`"PANELCONTAINER"` | Declare plugin panel container | `{namespace}-panel-container`
`"PANELCOLLECTION"` | Declare plugin panel collection | `{namespace}-panel-collection`
`"PANELSOLID"` | Declare plugin panel solid | `{namespace}-panel-solid`
`"PANELGRADIENT"` | Declare plugin panel gradient | `{namespace}-panel-gradient`
`"SELECTED"` | Declare plugin selected | `{namespace}-selected`
`"SOLIDHANDLE"` | Declare plugin solid handle | `{namespace}-solid-handle`
`"SOLIDPRIMARY"` | Declare plugin solid primary | `{namespace}-solid-primary`
`"SOLIDACTION"` | Declare plugin solid action | `{namespace}-solid-action`
`"CONTRAST"` | Declare plugin contrast | `{namespace}-contrast`
`"CONTRASTNOW"` | Declare plugin contrast now | `{namespace}-contrast-now`
`"CONTRASTPREV"` | Declare plugin contrast prev | `{namespace}-contrast-prev`
`"HISTORY"` | Declare plugin history | `{namespace}-history`
`"HISTORYITEM"` | Declare plugin history item | `{namespace}-history-item`
`"FAVORITES"` | Declare plugin favorites | `{namespace}-favorites`
`"SCHEME"` | Declare plugin scheme | `{namespace}-scheme`
`"GROUPTITLE"` | Declare plugin group title | `{namespace}-group-title`
`"GROUPLIST"` | Declare plugin group list | `{namespace}-group-list`
`"COLLECTIONITEM"` | Declare plugin collection item | `{namespace}-collection-item`
`"MANAGE"` | Declare plugin manage | `{namespace}-manage`
`"COLLECTIONSCROLLWRAP"` | Declare plugin collection scroll wrap | `{namespace}-collection-scrollwrap`
`"POINTER"` | Declare plugin pointer | `{namespace}-pointer`
`"ALPHA"` | Declare plugin alpha | `{namespace}-alpha`
`"HUE"` | Declare plugin hue | `{namespace}-hue`
`"HEX"` | Declare plugin hex | `{namespace}-hex`
`"SATURATION"` | Declare plugin saturation | `{namespace}-saturation`
`"CANCEL"` | Announce plugin is cancel | `{namespace}-cancel`
`"OK"` | Announce plugin is ok | `{namespace}-ok`
`"GRADIENTHANDLE"` | Declare plugin gradient handle | `{namespace}-gradient-handle`
`"GRADIENTPRIMARY"` | Declare plugin gradient primary | `{namespace}-gradient-primary`
`"GRADIENTACTION"` | Declare plugin gradient action | `{namespace}-gradient-action`
`"GRADIENTBAR"` | Declare plugin gradient bar | `{namespace}-gradient-bar`
`"GRADIENTBARVIEW"` | Declare plugin gradient bar view | `{namespace}-gradient-bar-view`
`"GRADIENTCONTENT"` | Declare plugin gradient content | `{namespace}-gradient-content`
`"GRADIENTREMOVE"` | Declare plugin gradient remove | `{namespace}-gradient-remove`
`"GRADIENTREMOVEACTIVE"` | Declare plugin gradient remove active | `{namespace}-gradient-remove-active`
`"GRADIENTMODE"` | Declare plugin gradient mode | `{namespace}-gradient-mode`
`"MARKER"` | Declare plugin marker | `{namespace}-marker`
`"MARKERACTIVE"` | Declare plugin marker active | `{namespace}-marker-active`
`"WHEEL"` | Declare plugin wheel | `{namespace}-wheel`
`"WHEELHANDLE"` | Declare plugin wheel handle | `{namespace}-wheel-handle`
`"WHEELANGLE"` | Declare plugin wheel angle | `{namespace}-wheel-angle`

### Translations

Name | EN | ZH
-----|------|-------
`"ok"` | ok | 保存
`"cancel"` | Cancel | 取消
`"manage"` | Manage | 管理
`"collection"` | Collection | 收藏
`"solid"` | Solid | 纯色
`"gradient"` | Gradient | 渐变
`"colorInScheme"` | COLORS IN SCHEME | 颜色格式
`"myColors"` | MY COLORS | 我的颜色
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/color-picker is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/color-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
# FontEditor

[![npm package](https://img.shields.io/npm/v/@pluginjs/font-editor.svg)](https://www.npmjs.com/package/@pluginjs/font-editor)

A flexible modern font-editor js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/fontEditor/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/font-editor
```

#### NPM

```javascript
npm i @pluginjs/font-editor
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/font-editor/dist/font-editor.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-editor/dist/font-editor.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/font-editor/dist/font-editor.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-editor/dist/font-editor.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import FontEditor from "@pluginjs/font-editor"
import "@pluginjs/font-editor/dist/font-editor.css"

FontEditor.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/font-editor/dist/font-editor.css")
const FontEditor = require("@pluginjs/font-editor")

FontEditor.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-editor/dist/font-editor.css">
<script src="https://unpkg.com/@pluginjs/font-editor/dist/font-editor.js"></script>
<script>
  Pj.fontEditor('.element', options)
</script>
```

## API

### Options

Options are called on fontEditor instances through the fontEditor options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"disabled"` | Disabled plugin | `false`
`"fontFamily"` | Defined element of the font family | `{"value":"inherit","values":{"Arial":"Arial","Bpreplay":"Bpreplay","Cambira":"Cambira","Gabriola":"Gabriola","inherit":"inherit"}}`
`"fontWeight"` | Dfined element of the font weight | `{"value":"inherit","values":["inherit","bold","400","500","600","700"]}`
`"fontSize"` | Defined element of the font size | `{"value":"inherit","unit":"px","units":["inherit","px","em","rem"],"min":0,"max":100,"step":2}`
`"lineHeight"` | Defined element of the line height | `{"value":"inherit","unit":"em","units":["inherit","px","em","rem"],"min":1,"max":10,"step":0.5}`
`"textAlign"` | Defined element of the text align | `{"value":"left","values":["left","center","right"]}`
`"fontStyle"` | Defined element of the font style | `{"value":"normal","values":["italic","normal"]}`
`"textTransform"` | Defined element of the text transform | `{"value":"none","values":["uppercase","lowercase","capitalize"]}`
`"textDecoration"` | Defined element of the text decoration | `{"value":"none","values":["underline","line-through"]}`
`"template"` | Set default template | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"onChange"` | Gets fired when plugin has change | `function() {...}`
`"onClick"` | Gets fired when plugin has click | `function() {...}`

### Events

Events are called on fontEditor instances through the fontEditor events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on fontEditor instances through the fontEditor method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"val"` | Set or get value by key
`"set"` | Set value by key
`"get"` | Get value by key
`"clear"` | clear plugin
`"setTextDecoration"` | Set value of text decoration
`"setTextTranform"` | Set value of text tranform
`"setTextAlign"` | Set value of text align
`"setFontStyle"` | Set value of font style
`"setFontWeight"` | Set value of font weight
`"setFontFamily"` | Set value of font family
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-fontEditor`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"EXSIT"` | Announce plugin is exsit | `{namespace}-exsit`
`"EMPTY"` | Announce plugin is empyt | `{namespace}-empty`
`"EXPAND"` | Announce plugin is expand | `{namespace}-expand`
`"EXPANDPANEL"` | declare plugin expandpanel | `{namespace}-expand-panel`
`"EXPANDCONTROL"` | declare plugin expandcontrol | `{namespace}-expand-control`
`"EXPANDCANCEL"` | declare plugin expandcancel | `{namespace}-expand-cancel`
`"EXPANDSAVE"` | declare plugin expandsave | `{namespace}-expand-save`
`"INHERIT"` | declare plugin inherit | `{namespace}-inherit`

### Translations

Name | EN | ZH
--||-
`"addTypography"` | Add Typography | 添加排版
`"fontFamily"` | Font Family | 字体
`"change"` | Change | 更改
`"typeface"` | Typeface | 风格
`"fontSize"` | Font Size | 字号
`"lineHeight"` | Line Height | 行高
`"weight"` | Weight | 字重

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/font-editor is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/font-editor project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
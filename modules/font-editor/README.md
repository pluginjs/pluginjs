# FontEditor
> A flexible modern font-editor js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/font-editor
```
#### NPM
```javascript
npm i @pluginjs/font-editor
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import fontEditor from "@pluginjs/font-editor"
```

CommonJS
```javascript
require("@pluginjs/font-editor")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/font-editor.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/font-editor.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/font-editor.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/font-editor.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
JS:
```javascript
Pj.fontEditor('.element', options);
```
---
## API

### Options:
Options are called on fontEditor instances through the fontEditor options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"disabled"` | Disabled plugin | `false`
`"fontFamily"` | Defined element of the font family | `{&quot;value&quot;:&quot;inherit&quot;,&quot;values&quot;:{&quot;Arial&quot;:&quot;Arial&quot;,&quot;Bpreplay&quot;:&quot;Bpreplay&quot;,&quot;Cambira&quot;:&quot;Cambira&quot;,&quot;Gabriola&quot;:&quot;Gabriola&quot;,&quot;inherit&quot;:&quot;inherit&quot;}}`
`"fontWeight"` | Dfined element of the font weight | `{&quot;value&quot;:&quot;inherit&quot;,&quot;values&quot;:[&quot;inherit&quot;,&quot;bold&quot;,&quot;400&quot;,&quot;500&quot;,&quot;600&quot;,&quot;700&quot;]}`
`"fontSize"` | Defined element of the font size | `{&quot;value&quot;:&quot;inherit&quot;,&quot;unit&quot;:&quot;px&quot;,&quot;units&quot;:[&quot;inherit&quot;,&quot;px&quot;,&quot;em&quot;,&quot;rem&quot;],&quot;min&quot;:0,&quot;max&quot;:100,&quot;step&quot;:2}`
`"lineHeight"` | Defined element of the line height | `{&quot;value&quot;:&quot;inherit&quot;,&quot;unit&quot;:&quot;em&quot;,&quot;units&quot;:[&quot;inherit&quot;,&quot;px&quot;,&quot;em&quot;,&quot;rem&quot;],&quot;min&quot;:1,&quot;max&quot;:10,&quot;step&quot;:0.5}`
`"textAlign"` | Defined element of the text align | `{&quot;value&quot;:&quot;left&quot;,&quot;values&quot;:[&quot;left&quot;,&quot;center&quot;,&quot;right&quot;]}`
`"fontStyle"` | Defined element of the font style | `{&quot;value&quot;:&quot;normal&quot;,&quot;values&quot;:[&quot;italic&quot;,&quot;normal&quot;]}`
`"textTransform"` | Defined element of the text transform | `{&quot;value&quot;:&quot;none&quot;,&quot;values&quot;:[&quot;uppercase&quot;,&quot;lowercase&quot;,&quot;capitalize&quot;]}`
`"textDecoration"` | Defined element of the text decoration | `{&quot;value&quot;:&quot;none&quot;,&quot;values&quot;:[&quot;underline&quot;,&quot;line-through&quot;]}`
`"template"` | Set default template | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"onChange"` | Gets fired when plugin has change | `function() {...}`
`"onClick"` | Gets fired when plugin has click | `function() {...}`

### Events:
Events are called on fontEditor instances through the fontEditor events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

```
### Methods:
Methods are called on fontEditor instances through the fontEditor method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
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

**example:**
```javascript
Pj.$fontEditor('.element', val)
Pj.$fontEditor('.element', val, "foo")
Pj.$fontEditor('.element', val, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
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


### Translations:
Name | EN | ZH
-----|------|-------
`"addTypography"` | Add Typography | 添加排版
`"fontFamily"` | Font Family | 字体
`"change"` | Change | 更改
`"typeface"` | Typeface | 风格
`"fontSize"` | Font Size | 字号
`"lineHeight"` | Line Height | 行高
`"weight"` | Weight | 字重


### Dependencies:
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`

---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/plugin/plugin.js/releases).

## Version
Version: 0.2.19

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
# GradientSelector

[![npm package](https://img.shields.io/npm/v/@pluginjs/gradient-selector.svg)](https://www.npmjs.com/package/@pluginjs/gradient-selector)

A flexible modern gradient-selector js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/gradientSelector/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/gradient-selector
```

#### NPM

```javascript
npm i @pluginjs/gradient-selector
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/gradient-selector/dist/gradient-selector.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gradient-selector/dist/gradient-selector.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/gradient-selector/dist/gradient-selector.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gradient-selector/dist/gradient-selector.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import GradientSelector from "@pluginjs/gradient-selector"
import "@pluginjs/gradient-selector/dist/gradient-selector.css"

GradientSelector.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/gradient-selector/dist/gradient-selector.css")
const GradientSelector = require("@pluginjs/gradient-selector")

GradientSelector.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gradient-selector/dist/gradient-selector.css">
<script src="https://unpkg.com/@pluginjs/gradient-selector/dist/gradient-selector.js"></script>
<script>
  Pj.gradientSelector('.element', options)
</script>
```

## API

### Options

Options are called on gradientSelector instances through the gradientSelector options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"data"` | Set plugin data option | `null`
`"disabled"` | Disabled plugin | `false`
`"templates"` | Set default templates | `{}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events

Events are called on gradientSelector instances through the gradientSelector events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on gradientSelector instances through the gradientSelector method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"clear"` | Clear plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-gradientSelector`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"CLOSE"` | Announce plugin is close | `{namespace}-close`
`"WARNING"` | Announce plugin is warnting | `{namespace}-warning`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"INFOIMG"` | Declare plugin infoimg | `{namespace}-info-img`
`"EDITOR"` | Declare plugin editor | `{namespace}-editor`
`"REMOVE"` | Declare plugin remove | `{namespace}-remove`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"PREVIEWIMG"` | Announce plugin is previewing | `{namespace}-preview-img`
`"COLORPICKER"` | Declare plugin colorpicker | `{namespace}-colorpicker`
`"COLORTYPE"` | Declare plugin  color type | `{namespace}-colortype`
`"PRESET"` | Declare plugin  preset | `{namespace}-preset`
`"CUSTOM"` | Declare plugin custom | `{namespace}-custom`
`"CUSTOMMODE"` | Declare plugin custommode | `{namespace}-custom-mode`
`"OPACITY"` | Declare plugin opacity | `{namespace}-opacity`
`"SELECTORLIST"` | Declare plugin selectorlist | `{namespace}-selector-list`
`"SELECTORITEM"` | Declare plugin selectoritem | `{namespace}-selector-item`

### Translations

Name | EN | ZH
--||-
`"chooseGradient"` | Choose Gradient | 选择渐变
`"customColor"` | Custom Color | 自定义颜色
`"opacity"` | Opacity | 透明度
`"preset"` | Preset | 预设
`"custom"` | Custom | 自定义
`"save"` | Save | 保存
`"selectTitle"` | Preset Background Library | 预设背景库
`"selectContentTitle"` | Choose a Background Preset | 选择预设背景
`"selectCancel"` | Cancel | 取消
`"useIt"` | Use It | 使用
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"cancel"` | Cancel | 取消
`"delete"` | Delete | 删除

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/gradient-selector is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/gradient-selector project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
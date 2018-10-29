# BgPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/bg-picker.svg)](https://www.npmjs.com/package/@pluginjs/bg-picker)

A flexible modern bg-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/bgPicker/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/bg-picker
```

#### NPM

```javascript
npm i @pluginjs/bg-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/bg-picker/dist/bg-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/bg-picker/dist/bg-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/bg-picker/dist/bg-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/bg-picker/dist/bg-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import BgPicker from "@pluginjs/bg-picker"
import "@pluginjs/bg-picker/dist/bg-picker.css"

BgPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/bg-picker/dist/bg-picker.css")
const BgPicker = require("@pluginjs/bg-picker")

BgPicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/bg-picker/dist/bg-picker.css">
<script src="https://unpkg.com/@pluginjs/bg-picker/dist/bg-picker.js"></script>
<script>
  Pj.bgPicker('.element', options)
</script>
```

## API

### Options

Options are called on bgPicker instances through the bgPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"image"` | Set plugin image option | ``
`"thumbnail"` | Set plugin thumbnail option | ``
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set plugin is localeFallbacks or not | `true`
`"disabled"` | Disable plugin | `false`
`"repeat"` | Set repeat | `{"defaultValue":"repeat","values":["no-repeat","repeat","repeat-x","repeat-y"]}`
`"position"` | Set position | `{"defaultValue":"top left","values":["top left","top center","top right","center left","center center","center right","bottom left","bottom center","bottom right"]}`
`"size"` | Set size | `{"defaultValue":"auto","values":["auto 100%","100% auto","100% 100%","auto"]}`
`"attachment"` | Set attachment | `{"namespace":"pj-dropdown","defaultValue":"scroll","values":["scroll","fixed","inherit"]}`
`"template"` | Set default template | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"select"` | Set select event | `function() {...}`
`"onChange"` | The onchange event occurs when the content of the domain changes | `function() {...}`

### Events

Events are called on bgPicker instances through the bgPicker events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on bgPicker instances through the bgPicker method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"val"` | Set or get value by key
`"get"` | Get value by key
`"set"` | Set value by key
`"setAttachment"` | Set value of attachment
`"setPosition"` | Set value of position
`"setSize"` | Set value of size
`"setRepeat"` | Set value of repeat
`"setImage"` | Set value of image
`"clear"` | clear plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-bgPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"INPUT"` | Declare plugin input | `{namespace}-input`
`"INITIATE"` | Declare plugin initate | `{namespace}-initiate`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"INFOIMAGE"` | Declare plugin infoimage | `{namespace}-info-image`
`"IMAGENAMEINFO"` | Declare plugin imagenameinfo | `{namespace}-info-image-name`
`"REMOVE"` | Declare plugin remove | `{namespace}-info-remove`
`"EDIT"` | Declare plugin edit | `{namespace}-info-edit`
`"EXPANDPANEL"` | Declare plugin expandpanel | `{namespace}-expand-panel`
`"CONTROL"` | Declare plugin control | `{namespace}-expand-control`
`"CANCEL"` | Declare plugin cancel | `{namespace}-expand-cancel`
`"SAVE"` | Declare plugin save | `{namespace}-expand-save`
`"IMAGEWRAP"` | Declare plugin imagewrap | `{namespace}-expand-image-wrap`
`"IMAGE"` | Declare plugin image | `{namespace}-expand-image`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"EMPTY"` | Declare plugin empty | `{namespace}-empty`
`"EXIST"` | Declare plugin exist | `{namespace}-exist`
`"EXPAND"` | Declare plugin expand | `{namespace}-expand`

### Translations

Name | EN | ZH
--||-
`"placeholder"` | Add Image | 添加图片
`"change"` | change | 更换图片
`"bgRepeat"` | Repeat | 重复
`"bgPosition"` | Position | 位置
`"bgAttach"` | Attach | 附着
`"bgSize"` | Scalling | 比例
`"cancel"` | cancel | 取消
`"save"` | save | 保存

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/bg-picker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/bg-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
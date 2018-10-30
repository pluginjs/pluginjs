# GalleryPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/gallery-picker.svg)](https://www.npmjs.com/package/@pluginjs/gallery-picker)

A flexible modern gallery-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/galleryPicker/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/gallery-picker
```

#### NPM

```javascript
npm i @pluginjs/gallery-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/gallery-picker/dist/gallery-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gallery-picker/dist/gallery-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/gallery-picker/dist/gallery-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gallery-picker/dist/gallery-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import GalleryPicker from "@pluginjs/gallery-picker"
import "@pluginjs/gallery-picker/dist/gallery-picker.css"

GalleryPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/gallery-picker/dist/gallery-picker.css")
const GalleryPicker = require("@pluginjs/gallery-picker")

GalleryPicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gallery-picker/dist/gallery-picker.css">
<script src="https://unpkg.com/@pluginjs/gallery-picker/dist/gallery-picker.js"></script>
<script>
  Pj.galleryPicker('.element', options)
</script>
```

## API

### Options

Options are called on galleryPicker instances through the galleryPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"viewportSize"` | Set viewportSize option | `330`
`"disabled"` | Disabled plugin | `false`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"getImage"` | Get value of image | `function() {...}`
`"change"` | Get  value of image url | `function() {...}`
`"add"` | Get an array of image url list | `function() {...}`

### Events

Events are called on galleryPicker instances through the galleryPicker events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on galleryPicker instances through the galleryPicker method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"val"` | Set or get value by key
`"get"` | Get value by key
`"set"` | Set value by key
`"clear"` | Clear plugin
`"remove"` | Remove plugin
`"change"` | Change plugin
`"add"` | add plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-galleryPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"EMPTY"` | Announce plugin is empty | `{namespace}-empty`
`"EXIST"` | Announce plugin is exist | `{namespace}-exist`
`"EXPAND"` | Announce plugin is expand | `{namespace}-expand`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"INFOEDIT"` | Declare plugin infoedit | `{namespace}-info-edit`
`"INFOREMOVE"` | Declare plugin inforemove | `{namespace}-info-remove`
`"EXPANDCANCELBTN"` | Declare plugin expandcancelbtn | `{namespace}-expand-cancel-btn`
`"EXPANDSAVEBTN"` | Declare plugin expandsavebtn | `{namespace}-expand-save-btn`
`"EXPANDADDBTN"` | Declare plugin expandaddbtn | `{namespace}-expand-add-btn`
`"EXPANDADD"` | Declare plugin expandadd | `{namespace}-expand-add`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"ITEMIMAGE"` | Declare plugin itemimage | `{namespace}-item-image`
`"ITEMREMOVE"` | Declare plugin itemremove | `{namespace}-item-remove`
`"ITEMRESELECT"` | Declare plugin itemselect | `{namespace}-item-reselect`

### Translations

Name | EN | ZH
--||-
`"placeholder"` | Choose images | 点击添加
`"count"` | zero | 零
`"expand"` | expand | 展开
`"change"` | change | 更换图片
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"cancel"` | Cancel | 取消
`"delete"` | Delete | 删除
`"add"` | Add | 添加
`"save"` | Save | 保存

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/gallery-picker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/gallery-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com). 
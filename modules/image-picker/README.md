# ImagePicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/image-picker.svg)](https://www.npmjs.com/package/@pluginjs/image-picker)

A flexible modern image-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/imagePicker/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/image-picker
```

#### NPM

```javascript
npm i @pluginjs/image-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/image-picker/dist/image-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-picker/dist/image-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/image-picker/dist/image-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-picker/dist/image-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ImagePicker from "@pluginjs/image-picker"
import "@pluginjs/image-picker/dist/image-picker.css"

ImagePicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/image-picker/dist/image-picker.css")
const ImagePicker = require("@pluginjs/image-picker")

ImagePicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-picker/dist/image-picker.css">
<script src="https://unpkg.com/@pluginjs/image-picker/dist/image-picker.js"></script>
<script>
  Pj.imagePicker('.element', options)
</script>
```

## API

### Options

Options are called on imagePicker instances through the imagePicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"disabled"` | Disabled plugin | `false`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"template"` | Set default template | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"onChange"` | Gets fired when plugin has change | `function() {...}`
`"select"` | Gets fired when plugin has select | `function() {...}`
`"strings"` | Gets fired when plugin has strings | `{}`

### Events

Events are called on imagePicker instances through the imagePicker events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on imagePicker instances through the imagePicker method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"get"` | Get value by key
`"set"` | Set value by key
`"clear"` | Clear plugin
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-imagePicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"EMPTY"` | Declare plugin empty | `{namespace}-empty`
`"EXIST"` | Declare plugin exist | `{namespace}-exist`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"INITIAL"` | Declare plugin is initial | `{namespace}-initial`
`"INFO"` | Declare plugin is info | `{namespace}-info`
`"INFOCHANGE"` | Declare plugin is infohange | `{namespace}-info-change`
`"INFOIMAGE"` | Declare plugin is infoimage | `{namespace}-info-image`
`"INFOREMOVE"` | Declare plugin is inforemove | `{namespace}-info-remove`
`"INFORESELECT"` | Declare plugin is inforeselect | `{namespace}-info-reselect`

### Translations

Name | EN | ZH
--||-
`"placeholder"` | Click to upload | 点击上传
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"cancel"` | Cancel | 取消
`"delete"` | Delete | 删除

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/image-picker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/image-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
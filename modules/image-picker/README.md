# ImagePicker
> A flexible modern image-picker js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/image-picker
```
#### NPM
```javascript
npm i @pluginjs/image-picker
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import imagePicker from "@pluginjs/image-picker"
```

CommonJS
```javascript
require("@pluginjs/image-picker")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/image-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/image-picker.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/image-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/image-picker.min.css">
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
Pj.imagePicker('.element', options);
```
---
## API

### Options:
Options are called on imagePicker instances through the imagePicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
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

### Events:
Events are called on imagePicker instances through the imagePicker events itself.
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
Methods are called on imagePicker instances through the imagePicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"clear"` | Clear plugin
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$imagePicker('.element', get)
Pj.$imagePicker('.element', get, "foo")
Pj.$imagePicker('.element', get, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
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


### Translations:
Name | EN | ZH
-----|------|-------
`"placeholder"` | Click to upload | 点击上传
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"cancel"` | Cancel | 取消
`"delete"` | Delete | 删除


### Dependencies:
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
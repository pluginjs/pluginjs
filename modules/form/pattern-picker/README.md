# PatternPicker
> A flexible modern pattern-picker js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/pattern-picker
```
#### NPM
```javascript
npm i @pluginjs/pattern-picker
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import patternPicker from "@pluginjs/pattern-picker"
```

CommonJS
```javascript
require("@pluginjs/pattern-picker")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/pattern-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/pattern-picker.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/pattern-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/pattern-picker.min.css">
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
Pj.patternPicker('.element', options);
```
---
## API

### Options:
Options are called on patternPicker instances through the patternPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"data"` | Set data | `null`
`"bgcolor"` | Set bgcolor | `#eee`
`"disabled"` | Disable plugin | `false`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"format"` | Set plugin format option | `function() {...}`

### Events:
Events are called on patternPicker instances through the patternPicker events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

```
### Methods:
Methods are called on patternPicker instances through the patternPicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"clear"` | Clear plugin

**example:**
```javascript
Pj.$patternPicker('.element', enable)
Pj.$patternPicker('.element', enable, "foo")
Pj.$patternPicker('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-patternPicker`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"SHOW"` | Annouce plugin is show | `{namespace}-show`
`"CLOSE"` | Annouce plugin is close | `{namespace}-close`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"INFOIMG"` | Declare plugin infoimg | `{namespace}-info-img`
`"EDITOR"` | Declare plugin editor | `{namespace}-editor`
`"REMOVE"` | Declare plugin remove | `{namespace}-remove`
`"EMPTY"` | Declare plugin empty | `{namespace}-empty`
`"HOVER"` | Annouce plugin is hover | `{namespace}-hover`
`"PREVIEWIMG"` | Declare plugin previewimg | `{namespace}-preview-img`
`"FORECOLOR"` | Declare plugin forecolor | `{namespace}-forecolor`
`"BGCOLOR"` | Declare plugin bgcolor | `{namespace}-bgcolor`
`"OPACITY"` | Declare plugin opacity | `{namespace}-opacity`
`"SELECTORLIST"` | Declare plugin selectorlist | `{namespace}-selector-list`
`"SELECTORITEM"` | Declare plugin selectoritem | `{namespace}-selector-item`


### Translations:
Name | EN | ZH
-----|------|-------
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除
`"choosePattern"` | Choose Pattern | 选择图片
`"foreColor"` | ForeColor | 前颜色
`"bgColor"` | BgColor | 背景颜色
`"opacity"` | Opacity | 透明度
`"save"` | Save | 保存
`"cancel"` | Cancel | 取消
`"useIt"` | Use It | 使用
`"selectorTitle"` | Preset Background Library | 预设背景库
`"selectorContent"` | Choose a PatternPicker | 选择一个模式


### Dependencies:
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
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
Version: 0.2.22

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
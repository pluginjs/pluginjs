# TagList
> A flexible modern tag-list js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/tag-list
```
#### NPM
```javascript
npm i @pluginjs/tag-list
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import tagList from "@pluginjs/tag-list"
```

CommonJS
```javascript
require("@pluginjs/tag-list")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/tag-list.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/tag-list.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/tag-list.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/tag-list.min.css">
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
Pj.tagList('.element', options);
```
---
## API

### Options:
Options are called on tagList instances through the tagList options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set localeFallbacks | `true`
`"data"` | Set data | `null`
`"actions"` | Set actions | `[{&quot;tagName&quot;:&quot;i&quot;,&quot;trigger&quot;:&quot;icon-close pj-list-close&quot;,&quot;event&quot;:&quot;click&quot;}]`
`"templates"` | Set default templates | `{}`

### Events:
Events are called on tagList instances through the tagList events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

```
### Methods:
Methods are called on tagList instances through the tagList method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"value"` | Get value
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$tagList('.element', value)
Pj.$tagList('.element', value, "foo")
Pj.$tagList('.element', value, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-tagList`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ADD"` | Declare plugin add | `{namespace}-add`
`"ADDINPUT"` | Declare plugin addinput | `{namespace}-input`
`"ADDBTN"` | Declare plugin addbtn | `{namespace}-btn`


### Translations:
Name | EN | ZH
-----|------|-------
`"addPlaceholder"` | Enter new tags... | 添加新标签...
`"add"` | Add | 添加
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除


### Dependencies:
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
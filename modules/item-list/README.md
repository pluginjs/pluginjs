# ItemList
> A flexible modern item-list js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/item-list
```
#### NPM
```javascript
npm i @pluginjs/item-list
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import itemList from "@pluginjs/item-list"
```

CommonJS
```javascript
require("@pluginjs/item-list")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/item-list.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/item-list.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/item-list.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/item-list.min.css">
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
Pj.itemList('.element', options);
```
---
## API

### Options:
Options are called on itemList instances through the itemList options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"data"` | Set data option | `null`
`"actions"` | Set plugin actions option | `[{&quot;tagName&quot;:&quot;i&quot;,&quot;trigger&quot;:&quot;icon-clone pj-itemList-item-clone&quot;,&quot;event&quot;:&quot;click&quot;,&quot;init&quot;:null},{&quot;tagName&quot;:&quot;i&quot;,&quot;trigger&quot;:&quot;icon-close pj-list-close&quot;,&quot;event&quot;:&quot;click&quot;}]`
`"templates"` | Set default templates | `{}`

### Events:
Events are called on itemList instances through the itemList events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"add"` | Gets fired when plugin has add
`"clickAddBtn"` | Gets fired when plugin has clickAddBtn
`"clickItem"` | Gets fired when plugin has clickItem
`"clone"` | Gets fired when plugin has clone

```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-itemList`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ADD"` | Declare plugin add | `{namespace}-add`
`"CANCEL"` | Declare plugin cancel | `{namespace}-cancel`
`"SAVE"` | Announce plugin is save | `{namespace}-save`
`"CLONE"` | Announce plugin is close | `{namespace}-item-clone`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`


### Translations:
Name | EN | ZH
-----|------|-------
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
Version: 0.2.20

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
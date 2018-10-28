# ItemList

[![npm package](https://img.shields.io/npm/v/@pluginjs/item-list.svg)](https://www.npmjs.com/package/@pluginjs/item-list)

A flexible modern item-list js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/itemList/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/item-list
```

#### NPM

```javascript
npm i @pluginjs/item-list
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/item-list/dist/item-list.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/item-list/dist/item-list.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/item-list/dist/item-list.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/item-list/dist/item-list.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ItemList from "@pluginjs/item-list"
import "@pluginjs/item-list/dist/item-list.css"

ItemList.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/item-list/dist/item-list.css")
const ItemList = require("@pluginjs/item-list")

ItemList.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/item-list/dist/item-list.css">
<script src="https://unpkg.com/@pluginjs/item-list/dist/item-list.js"></script>
<script>
  Pj.itemList('.element', options)
</script>
```

## API

### Options

Options are called on itemList instances through the itemList options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"data"` | Set data option | `null`
`"actions"` | Set plugin actions option | `[{"tagName":"i","trigger":"icon-clone pj-itemList-item-clone","event":"click","init":null},{"tagName":"i","trigger":"icon-close pj-list-close","event":"click"}]`
`"templates"` | Set default templates | `{}`

### Events

Events are called on itemList instances through the itemList events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"add"` | Gets fired when plugin has add
`"clickAddBtn"` | Gets fired when plugin has clickAddBtn
`"clickItem"` | Gets fired when plugin has clickItem
`"clone"` | Gets fired when plugin has clone

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-itemList`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ADD"` | Declare plugin add | `{namespace}-add`
`"CANCEL"` | Declare plugin cancel | `{namespace}-cancel`
`"SAVE"` | Announce plugin is save | `{namespace}-save`
`"CLONE"` | Announce plugin is close | `{namespace}-item-clone`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

### Translations

Name | EN | ZH
--||-
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/item-list is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/item-list project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
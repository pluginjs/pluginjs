# List

[![npm package](https://img.shields.io/npm/v/@pluginjs/list.svg)](https://www.npmjs.com/package/@pluginjs/list)

A flexible modern list js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/list/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/list
```

#### NPM

```javascript
npm i @pluginjs/list
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/list/dist/list.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/list/dist/list.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/list/dist/list.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/list/dist/list.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import List from "@pluginjs/list"
import "@pluginjs/list/dist/list.css"

List.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/list/dist/list.css")
const List = require("@pluginjs/list")

List.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/list/dist/list.css">
<script src="https://unpkg.com/@pluginjs/list/dist/list.js"></script>
<script>
  Pj.list('.element', options)
</script>
```

## API

### Options

Options are called on list instances through the list options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"data"` | Set data option | `null`
`"disabled"` | Disabled option | `false`
`"label"` | Set label | `function() {...}`
`"actions"` | Set actions option | `[{"tagName":"i","trigger":"pj-icon pj-icon-remove pj-list-close","event":"click"}]`
`"templates"` | Set default templates | `{}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events

Events are called on list instances through the list events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"add"` | Gets fired when plugin has add
`"clickItem"` | Gets fired when plugin has clickItem
`"clear"` | Gets fired when plugin has clear
`"edited"` | Gets fired when plugin has edited

### Methods

Methods are called on list instances through the list method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"init"` | Initial plugin
`"insert"` | Insert plugin
`"clear"` | Clear plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-list`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"LABEL"` | Declare plugin label | `{namespace}-item-label`
`"ACTIONS"` | Declare plugin actions | `{namespace}-item-actions`
`"HANDLE"` | Declare plugin handle | `{namespace}-item-handle`
`"STORE"` | Declare plugin store | `{namespace}-store`
`"POPVER"` | Declare plugin popver | `{namespace}-popver`
`"CLONEANIMATE"` | Declare plugin cloneanimate | `{namespace}-item-clone-animate`

### Translations

Name | EN | ZH
--||-
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/list is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/list project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
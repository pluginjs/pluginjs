# TagList

[![npm package](https://img.shields.io/npm/v/@pluginjs/tag-list.svg)](https://www.npmjs.com/package/@pluginjs/tag-list)

A flexible modern tag-list js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/tagList/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/tag-list
```

#### NPM

```javascript
npm i @pluginjs/tag-list
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/tag-list/dist/tag-list.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/tag-list/dist/tag-list.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/tag-list/dist/tag-list.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/tag-list/dist/tag-list.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import TagList from "@pluginjs/tag-list"
import "@pluginjs/tag-list/dist/tag-list.css"

TagList.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/tag-list/dist/tag-list.css")
const TagList = require("@pluginjs/tag-list")

TagList.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/tag-list/dist/tag-list.css">
<script src="https://unpkg.com/@pluginjs/tag-list/dist/tag-list.js"></script>
<script>
  Pj.tagList('.element', options)
</script>
```

## API

### Options

Options are called on tagList instances through the tagList options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set localeFallbacks | `true`
`"data"` | Set data | `null`
`"actions"` | Set actions | `[{"tagName":"i","trigger":"icon-close pj-list-close","event":"click"}]`
`"templates"` | Set default templates | `{}`

### Events

Events are called on tagList instances through the tagList events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on tagList instances through the tagList method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"value"` | Get value
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-tagList`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ADD"` | Declare plugin add | `{namespace}-add`
`"ADDINPUT"` | Declare plugin addinput | `{namespace}-input`
`"ADDBTN"` | Declare plugin addbtn | `{namespace}-btn`

### Translations

Name | EN | ZH
--||-
`"addPlaceholder"` | Enter new tags... | 添加新标签...
`"add"` | Add | 添加
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/tag-list is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/tag-list project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# LinkPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/link-picker.svg)](https://www.npmjs.com/package/@pluginjs/link-picker)

A flexible modern link-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/linkPicker/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/link-picker
```

#### NPM

```javascript
npm i @pluginjs/link-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/link-picker/dist/link-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/link-picker/dist/link-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/link-picker/dist/link-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/link-picker/dist/link-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import LinkPicker from "@pluginjs/link-picker"
import "@pluginjs/link-picker/dist/link-picker.css"

LinkPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/link-picker/dist/link-picker.css")
const LinkPicker = require("@pluginjs/link-picker")

LinkPicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/link-picker/dist/link-picker.css">
<script src="https://unpkg.com/@pluginjs/link-picker/dist/link-picker.js"></script>
<script>
  Pj.linkPicker('.element', options)
</script>
```

## API

### Options

Options are called on linkPicker instances through the linkPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"title"` | Add plugin title | `Click to Add Link`
`"placeholder"` | Set input box prompt information | `Title`
`"locale"` | Set locale environment | `en`
`"disabled"` | Disabled plugin | `false`
`"sources"` | Set list of source name | `null`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events

Events are called on linkPicker instances through the linkPicker events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on linkPicker instances through the linkPicker method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"val"` | Set or get value by key
`"set"` | Set value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"update"` | Update plugin
`"get"` | Get value by key

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-linkPicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"INIT"` | Declare plugin init | `{namespace}-init`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"PREVIEW"` | Declare plugin preview | `{namespace}-preview`
`"TYPESWITCH"` | Declare plugin types switch | `{namespace}-types-switch`
`"TYPESPANEL"` | Declare plugin types panel | `{namespace}-types-panel`
`"TYPESCONTAINER"` | Declare plugin types container | `{namespace}-types-container`
`"TYPESCOMPONENT"` | Declare plugin types component | `{namespace}-types-component`
`"RADIO"` | Declare plugin type is radio | `{namespace}-radio`
`"RADIOINPUT"` | Declare plugin radio input | `{namespace}-radio-input`
`"LINK"` | Declare plugin link | `{namespace}-link`
`"ACTION"` | Declare plugin action | `{namespace}-action`
`"ACTIONEDIT"` | Declare plugin edit | `{namespace}-action-edit`
`"ACTIONREMOVE"` | Declare plugin action remove | `{namespace}-action-remove`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"PANELACTION"` | Declare plugin panel action | `{namespace}-panel-action`
`"PANELSAVE"` | Declare plugin panel save | `{namespace}-panel-save`
`"PANELCANCEL"` | Declare plugin panel cancel | `{namespace}-panel-cancel`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"ITEMTITLE"` | Declare plugin item title | `{namespace}-item-title`
`"ITEMBODY"` | Declare plugin item body | `{namespace}-item-body`
`"LINKTITLE"` | Declare plugin link title | `{namespace}-link-title`
`"DROPDOWNPANEL"` | Declare plugin dropdown panel | `{namespace}-dropdown-panel`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"FILL"` | Declare plugin fill | `{namespace}-fill`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`

### Translations

Name | EN | ZH
--||-
`"type"` | Type | 类型
`"contentType"` | Content Type | 内容样式
`"content"` | Content | 内容
`"openMode"` | Open Mode | 打开模式
`"linkTitle"` | Link Title | 链接标题
`"save"` | Save | 保存
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除
`"site content"` | site content | 网站内容
`"site archive"` | site archive | 网站存档
`"external url"` | external url | 外部网址
`"submit form"` | submit form | 提交表单
`"scroll to target"` | scroll to target | 滚动到目标
`"page"` | page | 页面
`"post"` | post | 推送
`"portfolio"` | portfolio | 组合
`"categogry archive"` | categogry archive | 类别档案
`"tag archive"` | tag archive | 标签档案
`"same window"` | same window | 同一窗口
`"new window"` | new window | 新窗口

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/link-picker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/link-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
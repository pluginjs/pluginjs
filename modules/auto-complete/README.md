# AutoComplete

[![npm package](https://img.shields.io/npm/v/@pluginjs/auto-complete.svg)](https://www.npmjs.com/package/@pluginjs/auto-complete)

A flexible modern auto-complete js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/auto-complete/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/auto-complete
```

#### NPM

```javascript
npm i @pluginjs/auto-complete
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import AutoComplete from "@pluginjs/auto-complete"
import "@pluginjs/auto-complete/dist/auto-complete.css"

AutoComplete.of(document.queryAutoCompleteor('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/auto-complete/dist/auto-complete.css")
const AutoComplete = require("@pluginjs/auto-complete")

AutoComplete.of(document.queryAutoCompleteor('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.css">
<script src="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.js"></script>
<script>
  Pj.auto-complete('.element', options)
</script>
```

## API

### Options

Options are called on auto-complete instances through the auto-complete options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"trigger"` | Set trigger | `click`
`"offset"` | Set offset | `[0,0]`
`"icon"` | Set default icon | `pj-icon pj-icon-char pj-icon-chevron-down`
`"multiple"` | Set multiple | `false`
`"clearable"` | Set clearable | `false`
`"filterable"` | Set filterable | `false`
`"closeAllButten"` | Set closeAllButton | `true`
`"placeholder"` | Set input box prompt information | `Please auto-complete`
`"notFoundText"` | Set notoFoundText | `Badge not found`
`"auto-completeed"` | Set auto-completeed | `null`
`"data"` | Set data | `null`
`"keyboard"` | Set keyboard | `true`
`"disabled"` | Disabled plugin | `false`
`"templates"` | Set default templates | `{}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events

Events are called on auto-complete instances through the auto-complete events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disabled"` | Disable plugin
`"destroy"` | Gets fired when plugin has destroy
`"load"` | Gets fired when plugin has load
`"open"` | Gets fired when plugin has open
`"close"` | Gets fired when plugin has close
`"click"` | Gets fired when plugin has click
`"change"` | Gets fired when plugin has changed
`"auto-complete"` | Gets fired when plugin has auto-complete
`"unauto-complete"` | Gets fired when plugin has unauto-complete
`"hide"` | Gets fired when plugin has hide

### Methods

Methods are called on auto-complete instances through the auto-complete method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"removeData"` | Set removeData
`"open"` | Get value of open
`"close"` | Get value of close

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-auto-complete`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"MULTIPLE"` | Declare plugin multiple | `{namespace}-multiple`
`"FILTERABLE"` | Declare plugin filterable | `{namespace}-filterable`
`"DROPDOWNLIST"` | Declare plugin dropdownlist | `{namespace}-dropdown`
`"TRIGGER"` | Declare plugin trigger | `{namespace}-trigger`
`"HASBADGE"` | Declare plugin hasbadge | `{namespace}-hpj-badge`
`"BADGE"` | Declare plugin badge | `{namespace}-badge`
`"BADGECONTENT"` | Declare plugin badge content | `{namespace}-badge-content`
`"BADGEDELETE"` | Declare plugin badge delete | `{namespace}-badge-delete`
`"LABEL"` | Declare plugin label | `{namespace}-label`
`"LIST"` | Declare plugin list | `{namespace}-list`
`"SUBLIST"` | Declare plugin sublist | `{namespace}-sublist`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"GROUP"` | Declare plugin group | `{namespace}-group`
`"GROUPLABEL"` | Declare plugin label | `{namespace}-group-label`
`"OPEN"` | Declare plugin open | `{namespace}-open`
`"NOTFOUND"` | Declare plugin not found | `{namespace}-not-found`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"MARK"` | Declare plugin mark | `{namespace}-mark`
`"SELECTED"` | Declare plugin auto-completeed | `{namespace}-auto-completeed`
`"FOCUS"` | Declare plugin focus | `{namespace}-focus`
`"LOADING"` | Declare plugin loading | `{namespace}-loading`
`"ERROR"` | Declare plugin error | `{namespace}-error`
`"HIDEICON"` | Declare plugin hideicon | `{namespace}-hideIcon`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/auto-complete is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/auto-complete project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
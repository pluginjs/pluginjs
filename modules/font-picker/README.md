# FontPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/font-picker.svg)](https://www.npmjs.com/package/@pluginjs/font-picker)

A flexible modern font-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/font-picker/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/font-picker
```

#### NPM

```javascript
npm i @pluginjs/font-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import FontPicker from "@pluginjs/font-picker"
import "@pluginjs/font-picker/dist/font-picker.css"

FontPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/font-picker/dist/font-picker.css")
const Select = require("@pluginjs/font-picker")

Select.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.css">
<script src="https://unpkg.com/@pluginjs/font-picker/dist/font-picker.js"></script>
<script>
  Pj.fontPicker('.element', options)
</script>
```

## API

### Options

Options are called on fontPicker instances through the fontPicker options itself.
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
`"placeholder"` | Set input box prompt information | `Please select`
`"notFoundText"` | Set notoFoundText | `Badge not found`
`"selected"` | Set selected | `null`
`"data"` | Set data | `null`
`"keyboard"` | Set keyboard | `true`
`"disabled"` | Disabled plugin | `false`
`"templates"` | Set default templates | `{}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events

Events are called on fontPicker instances through the fontPicker events itself.
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
`"select"` | Gets fired when plugin has select
`"unselect"` | Gets fired when plugin has unselect
`"hide"` | Gets fired when plugin has hide

### Methods

Methods are called on fontPicker instances through the fontPicker method itself.
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
`"NAMESPACE"` | Declare plugin namespace | `pj-select`
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
`"SELECTED"` | Declare plugin selected | `{namespace}-selected`
`"FOCUS"` | Declare plugin focus | `{namespace}-focus`
`"LOADING"` | Declare plugin loading | `{namespace}-loading`
`"ERROR"` | Declare plugin error | `{namespace}-error`
`"HIDEICON"` | Declare plugin hideicon | `{namespace}-hideFont`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/fontPicker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/fontPicker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# ImageSelector

[![npm package](https://img.shields.io/npm/v/@pluginjs/image-selector.svg)](https://www.npmjs.com/package/@pluginjs/image-selector)

A flexible modern image-selector js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/image-selector/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/image-selector
```

#### NPM

```javascript
npm i @pluginjs/image-selector
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ImageSelector from "@pluginjs/image-selector"
import "@pluginjs/image-selector/dist/image-selector.css"

ImageSelector.of(document.queryImageSelectoror('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/image-selector/dist/image-selector.css")
const ImageSelector = require("@pluginjs/image-selector")

ImageSelector.of(document.queryImageSelectoror('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.css">
<script src="https://unpkg.com/@pluginjs/image-selector/dist/image-selector.js"></script>
<script>
  Pj.imageSelector('.element', options)
</script>
```

## API

### Options

Options are called on image-selector instances through the image-selector options itself.
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
`"placeholder"` | Set input box prompt information | `Please image-selector`
`"notFoundText"` | Set notoFoundText | `Badge not found`
`"selected"` | Set selected | `null`
`"data"` | Set data | `null`
`"keyboard"` | Set keyboard | `true`
`"disabled"` | Disabled plugin | `false`
`"templates"` | Set default templates | `{}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events

Events are called on image-selector instances through the image-selector events itself.
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
`"image-selector"` | Gets fired when plugin has image-selector
`"unimage-selector"` | Gets fired when plugin has unimage-selector
`"hide"` | Gets fired when plugin has hide

### Methods

Methods are called on image-selector instances through the image-selector method itself.
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
`"NAMESPACE"` | Declare plugin namespace | `pj-image-selector`
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
`"HIDEICON"` | Declare plugin hideicon | `{namespace}-hideIcon`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/image-selector is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/image-selector project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
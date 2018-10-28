# Dropdown

[![npm package](https://img.shields.io/npm/v/@pluginjs/dropdown.svg)](https://www.npmjs.com/package/@pluginjs/dropdown)

A flexible modern dropdown js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/dropdown/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/dropdown
```

#### NPM

```javascript
npm i @pluginjs/dropdown
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/dropdown/dist/dropdown.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dropdown/dist/dropdown.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/dropdown/dist/dropdown.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dropdown/dist/dropdown.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Dropdown from "@pluginjs/dropdown"
import "@pluginjs/dropdown/dist/dropdown.css"

Dropdown.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/dropdown/dist/dropdown.css")
const Dropdown = require("@pluginjs/dropdown")

Dropdown.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dropdown/dist/dropdown.css">
<script src="https://unpkg.com/@pluginjs/dropdown/dist/dropdown.js"></script>
<script>
  Pj.dropdown('.element', options)
</script>
```

## API

### Options

Options are called on dropdown instances through the dropdown options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"panel"` | Add panel to plugin | `+`
`"trigger"` | Add trigger action | `click`
`"exclusive"` | Show exclusive true or false | `true`
`"hideOnSelect"` | Hidden or not when plugin has be select | `true`
`"hideOutClick"` | When clicking outside of the dropdown, trigger hide event | `true`
`"keyboard"` | Enable keyboard of not | `false`
`"placement"` | Set dropdown items display placement | `bottom-left`
`"imitateSelect"` | Behave like select | `false`
`"inputLabel"` | Input label with select | `false`
`"placeholder"` | Input element placeholder | `Please select`
`"icon"` | Set icon | `false`
`"select"` | Set initial select value, when imitateSelect is true | `null`
`"itemValueAttr"` | Set item tag name | `value`
`"data"` | Add a json for loading | `null`
`"width"` | Set width | `null`
`"constraintToScrollParent"` | Set constraint to scroll parent | `true`
`"constraintToWindow"` | Set constraint to window | `true`
`"templates"` | Set plugin default templates | `{}`

### Events

Events are called on dropdown instances through the dropdown events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"hide"` | Gets fired when plugin is hidden
`"show"` | Gets fired when plugin is show
`"change"` | Gets fired when plugin is changed
`"click"` | Gets fired when plugin is clicked
`"trigger"` | Gets fired when plugin is triggerd

### Methods

Methods are called on dropdown instances through the dropdown method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"show"` | Show plugin
`"hide"` | Hide plugin
`"get"` | Get value by key
`"set"` | Set value by key
`"toggle"` | Active plugin or anti-active
`"update"` | Update plugin
`"replaceByData"` | Replace items by data
`"appendByData"` | Append items from data

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-dropdown`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"INPUTMODE"` | Declare input mode | `{namespace}-input`
`"SELECTMODE"` | Declare select mode | `{namespace}-select`
`"ELEMENT"` | Declare dropdown element | `{namespace}`
`"LABEL"` | Declare dropdown label | `{namespace}-label`
`"ICON"` | Declare icon element of dropdown | `{namespace}-icon`
`"ITEM"` | Declare item element of dropdown | `{namespace}-item`
`"SHOW"` | Declare show plugin | `{namespace}-show`
`"MASK"` | Declare mask of dropdown | `{namespace}-mask`
`"WRAP"` | Declare wrap of dropdown | `{namespace}-wrap`
`"PANEL"` | Declare panel element of dropdown | `{namespace}-panel`
`"PANELWRAP"` | Declare panel wrap element of dropdown | `{namespace}-panel-wrap`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"FOCUS"` | Declare focus status | `{namespace}-focus`
`"ACITVE"` | Declare active status | `{namespace}-active`
`"HOVER"` | Declare hover status | `{namespace}-hover`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/dropdown is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/dropdown project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
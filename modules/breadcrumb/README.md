# Breadcrumb

[![npm package](https://img.shields.io/npm/v/@pluginjs/breadcrumb.svg)](https://www.npmjs.com/package/@pluginjs/breadcrumb)

A flexible modern breadcrumb js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/breadcrumb/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/breadcrumb
```

#### NPM

```javascript
npm i @pluginjs/breadcrumb
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/breadcrumb/dist/breadcrumb.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/breadcrumb/dist/breadcrumb.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/breadcrumb/dist/breadcrumb.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/breadcrumb/dist/breadcrumb.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Breadcrumb from "@pluginjs/breadcrumb"
import "@pluginjs/breadcrumb/dist/breadcrumb.css"

Breadcrumb.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/breadcrumb/dist/breadcrumb.css")
const Breadcrumb = require("@pluginjs/breadcrumb")

Breadcrumb.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/breadcrumb/dist/breadcrumb.css">
<script src="https://unpkg.com/@pluginjs/breadcrumb/dist/breadcrumb.js"></script>
<script>
  Pj.breadcrumb('.element', options)
</script>
```

## API

### Options

Options are called on breadcrumb instances through the breadcrumb options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"responsive"` | Add responsive callback | `true`
`"overflow"` | Add direction of overflow | `left`
`"ellipsisText"` | Add is ellipsisText or not | `&amp;#8230;`
`"getItems"` | Add getItems method | `function() {...}`
`"getItemLink"` | Add getItemLink method | `function() {...}`
`"getDropdownMenu"` | Add getDropdownMenu method | `function() {...}`
`"templates"` | Plugin default templates | `{}`

### Events

Events are called on breadcrumb instances through the breadcrumb events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on breadcrumb instances through the breadcrumb method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-breadcrumb`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"OVERFLOW"` | Declare overflow direction | `{namespace}-{overflow}`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"TOGGLE"` | Declare toggle element | `{namespace}-toggle`
`"TOGGLEICON"` | Declare toggleicon element | `caret`
`"DROPDOWN"` | Declare dropdown scope | `dropdown`
`"DROPDOWNMENU"` | Declare dropdown menu node | `dropdown-menu`
`"DROPDOWNMENURIGHT"` | Declare dropdown menu right space | `dropdown-menu-right`
`"DROPDOWNITEM"` | Declare dropdown item node | ``
`"DROPDOWNITEMDISABLE"` | Declare dropdown has disabled | `disabled`
`"ELLIPSIS"` | Declare is Ellipsis element | `{namespace}-ellipsis`
`"HIDDEN"` | Declare plugin has hidden | `{namespace}-hidden`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/breadcrumb is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/breadcrumb project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
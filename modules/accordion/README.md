# Accordion

[![npm package](https://img.shields.io/npm/v/@pluginjs/accordion.svg)](https://www.npmjs.com/package/@pluginjs/accordion)

A flexible modern accordion js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/accordion/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/accordion
```

#### NPM

```javascript
npm i @pluginjs/accordion
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/accordion/dist/accordion.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/accordion/dist/accordion.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/accordion/dist/accordion.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/accordion/dist/accordion.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Accordion from "@pluginjs/accordion"
import "@pluginjs/accordion/dist/accordion.css"

Accordion.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/accordion/dist/accordion.css")
const Accordion = require("@pluginjs/accordion")

Accordion.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/accordion/dist/accordion.css">
<script src="https://unpkg.com/@pluginjs/accordion/dist/accordion.js"></script>
<script>
  Pj.accordion('.element', options)
</script>
```

## API

### Options

Options are called on accordion instances through the accordion options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `default`
`"panelSelector"` | Add panel selector to plugin | `null`
`"initialIndex"` | Set index of this plugin | `0`
`"duration"` | Set duration value | `300`
`"horizontal"` | Set is horizontal or not | `false`
`"multiple"` | Active multiple support | `false`
`"ajax"` | Enable ajax | `false`
`"breakWidth"` | Set width limit | `null`
`"resizeReference"` | Set resize reference | `window`
`"responsiveEffect"` | Set responsive effect | `easeInQuad`
`"dropdownLabelTpl"` | Set dropdown label | `<a href="javascript:void(0)"></a>`
`"responsiveDuration"` | Set responsive duration | `300`
`"onReady"` | Set ready callback | `null`

### Events

Events are called on accordion instances through the accordion events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"open"` | Gets fired when plugin is open
`"close"` | Gets fired when plugin is close
`"resize"` | Gets fired when plugin is resize

### Methods

Methods are called on accordion instances through the accordion method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"open"` | Open plugin
`"close"` | Close plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-accordion`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ACTIVE"` | Declare plugin is actived | `{namespace}-active`
`"DISABLED"` | Declare plugin is disabled | `{namespace}-disabled`
`"RESPONSIVE"` | Declare plugin is responsive | `{namespace}-responsive`
`"HORIZONTAL"` | Declare plugin has in horizontal status | `{namespace}-horizontal`
`"DROPDOWN"` | Declare plugin dropdown node | `{namespace}-dropdown`
`"DROPDOWNLABEL"` | Declare plugin dropdown label node | `{namespace}-dropdown-label`
`"DROPDOWNLIST"` | Declare plugin dropdown list node | `{namespace}-dropdown-list`
`"DROPDOWNOPEN"` | Declare plugin dropdown open node | `{namespace}-open`
`"PANE"` | Declare plugin pane node | `{namespace}-pane`
`"PANEHEADER"` | Declare plugin pane header node | `{namespace}-pane-header`
`"PANECONTENT"` | Declare plugin pane content node | `{namespace}-pane-content`
`"PANECONTENTINNER"` | Declare plugin pane contentinner node | `{namespace}-pane-content-inner`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/accordion is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/accordion project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
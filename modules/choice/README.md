# Choice

[![npm package](https://img.shields.io/npm/v/@pluginjs/choice.svg)](https://www.npmjs.com/package/@pluginjs/choice)

A flexible modern choice js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/choice/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/choice
```

#### NPM

```javascript
npm i @pluginjs/choice
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/choice/dist/choice.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/choice/dist/choice.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/choice/dist/choice.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/choice/dist/choice.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Choice from "@pluginjs/choice"
import "@pluginjs/choice/dist/choice.css"

Choice.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/choice/dist/choice.css")
const Choice = require("@pluginjs/choice")

Choice.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/choice/dist/choice.css">
<script src="https://unpkg.com/@pluginjs/choice/dist/choice.js"></script>
<script>
  Pj.choice('.element', options)
</script>
```

## API

### Options

Options are called on choice instances through the choice options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"multiple"` | Set multiple | `false`
`"value"` | Set vakue | ``
`"overflow"` | Set overflow | `false`
`"disabled"` | Disabled plugin | `false`
`"toggleTrigger"` | Set toggleTrigger | `hover`
`"toggleIcon"` | Set toggleIcon | `fa fa-caret-down`
`"templates"` | Set default templates | `{}`

### Events

Events are called on choice instances through the choice events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"select"` | Gets fired when plugin has select
`"unselect"` | Gets fired when plugin has unselect

### Methods

Methods are called on choice instances through the choice method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"select"` | Set value of select
`"unselect"` | Set value of unselect
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-choice`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"DROPDOWN"` | Declare dropdown scope | `{namespace}-dropdown`
`"DROPDOWNSHOW"` | Declare plugin dropdown show | `{namespace}-dropdown-show`
`"TOGGLE"` | Declare plugin toggle | `{namespace}-toggle`
`"SELECTED"` | Declare plugin selected | `{namespace}-selected`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/choice is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/choice project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
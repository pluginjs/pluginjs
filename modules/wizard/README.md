# Wizard

[![npm package](https://img.shields.io/npm/v/@pluginjs/wizard.svg)](https://www.npmjs.com/package/@pluginjs/wizard)

A flexible modern wizard js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/wizard/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/wizard
```

#### NPM

```javascript
npm i @pluginjs/wizard
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/wizard/dist/wizard.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/wizard/dist/wizard.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/wizard/dist/wizard.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/wizard/dist/wizard.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Wizard from "@pluginjs/wizard"
import "@pluginjs/wizard/dist/wizard.css"

Wizard.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/wizard/dist/wizard.css")
const Wizard = require("@pluginjs/wizard")

Wizard.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/wizard/dist/wizard.css">
<script src="https://unpkg.com/@pluginjs/wizard/dist/wizard.js"></script>
<script>
  Pj.wizard('.element', options)
</script>
```

## API

### Options

Options are called on wizard instances through the wizard options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"step"` | Set step value | `.pj-wizard-steps > li`
`"getPane"` | Set getPane callback | `function() {...}`
`"buttonsAppendTo"` | Set button append path | `this`
`"autoFocus"` | Set is enabled auto focus or not | `true`
`"keyboard"` | Set is enabled keyboard or not | `true`
`"enableWhenVisited"` | Set is enable visite or not | `false`
`"loading"` | Set loading step callback (include show, hide and fail) | `{}`
`"cacheContent"` | Set is enabled cache content or not | `false`
`"validator"` | Set validator callback | `function() {...}`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set is enabled locale fallbacks or not | `true`

### Events

Events are called on wizard instances through the wizard events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"afterChange"` | Gets fired when plugin has changed
`"beforeChange"` | Gets fired when plugin before change
`"next"` | Gets fired when plugin has trigger next event
`"back"` | Gets fired when plugin has trigger back event
`"finish"` | Gets fired when plugin has finish
`"init"` | Gets fired when plugin is initialing

### Methods

Methods are called on wizard instances through the wizard method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"get"` | Get value by key

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-wizard`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"SUCCESS"` | Announce plugin is loading success | `{namespace}-success`
`"ERROR"` | Announce plugin has throw a error | `{namespace}-error`
`"STEP"` | Declare plugin step | `[object Object]`
`"PANE"` | Declare plugin pane | `[object Object]`
`"BUTTONS"` | Declare buttons node | `[object Object]`
`"BUTTON"` | Declare button node | `[object Object]`

### Translations

Name | EN | ZH
--||-
`"back"` | Back | 返回
`"next"` | Next | 前进
`"finish"` | Finish | 完成

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/wizard is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/wizard project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
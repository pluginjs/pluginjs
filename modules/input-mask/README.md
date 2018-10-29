# InputMask

[![npm package](https://img.shields.io/npm/v/@pluginjs/input-mask.svg)](https://www.npmjs.com/package/@pluginjs/input-mask)

A flexible modern input-mask js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/inputMask/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/input-mask
```

#### NPM

```javascript
npm i @pluginjs/input-mask
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import InputMask from "@pluginjs/input-mask"
import "@pluginjs/input-mask/dist/input-mask.css"

InputMask.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/input-mask/dist/input-mask.css")
const InputMask = require("@pluginjs/input-mask")

InputMask.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.css">
<script src="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.js"></script>
<script>
  Pj.inputMask('.element', options)
</script>
```

## API

### Options

Options are called on inputMask instances through the inputMask options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"type"` | Set plugin type option | `custom`
`"delimiter"` | Set plugin delimiter option | ``
`"blocks"` | Set plugin blocks option | `noLimit`

### Events

Events are called on inputMask instances through the inputMask events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"focus"` | Gets fired when plugin has focus
`"blur"` | Gets fired when plugin has blur

### Methods

Methods are called on inputMask instances through the inputMask method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-inputMask`
`"INPUT"` | Declare plugin input | `{namespace}-input`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/input-mask is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/input-mask project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
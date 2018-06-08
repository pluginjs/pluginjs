# InputMask

[![npm package](https://img.shields.io/npm/v/@pluginjs/input-mask.svg)](https://www.npmjs.com/package/@pluginjs/input-mask)

A flexible modern input-mask js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/inputMask/samples)**

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

---

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
<body>
  <div class="element"></div>
</body>
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
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.css">
  <script async src="https://unpkg.com/@pluginjs/input-mask/dist/input-mask.js"></script>
</head>
```

```javascript
Pj.inputMask('.element', options);
```

---

## API

### Options

Options are called on inputMask instances through the inputMask options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"type"` | Set plugin type option | `custom`
`"delimiter"` | Set plugin delimiter option | ``
`"blocks"` | Set plugin blocks option | `noLimit`

### Events

Events are called on inputMask instances through the inputMask events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
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
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-inputMask`
`"INPUT"` | Declare plugin input | `{namespace}-input`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/input-mask is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/input-mask project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
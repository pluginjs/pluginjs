# AdaptText

[![npm package](https://img.shields.io/npm/v/@pluginjs/adapt-text.svg)](https://www.npmjs.com/package/@pluginjs/adapt-text)

A flexible modern adapt-text js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/adaptText/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/adapt-text
```

#### NPM

```javascript
npm i @pluginjs/adapt-text
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/adapt-text/dist/adapt-text.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/adapt-text/dist/adapt-text.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/adapt-text/dist/adapt-text.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/adapt-text/dist/adapt-text.min.css">
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
import AdaptText from "@pluginjs/adapt-text"
import "@pluginjs/adapt-text/dist/adapt-text.css"

AdaptText.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/adapt-text/dist/adapt-text.css")
const AdaptText = require("@pluginjs/adapt-text")

AdaptText.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/adapt-text/dist/adapt-text.css">
  <script async src="https://unpkg.com/@pluginjs/adapt-text/dist/adapt-text.js"></script>
</head>
```

```javascript
Pj.adaptText('.element', options);
```

---

## API

### Options

Options are called on adaptText instances through the adaptText options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"ratio"` | AdaptText ratio value | `10`
`"max"` | Max value | `Infinity`
`"min"` | Min value | `-Infinity`
`"scrollable"` | Can be scroll or not | `false`
`"scrollSpeed"` | factor of scroll speed | `1200`
`"scrollResetSpeed"` | Reset threshold of scroll speed | `300`
`"resize"` | Can be resize or not | `true`

### Events

Events are called on adaptText instances through the adaptText events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on adaptText instances through the adaptText method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"resize"` | Resize handle
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/adapt-text is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/adapt-text project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
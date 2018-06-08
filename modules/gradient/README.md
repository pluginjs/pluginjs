# Gradient

[![npm package](https://img.shields.io/npm/v/@pluginjs/gradient.svg)](https://www.npmjs.com/package/@pluginjs/gradient)

A flexible modern gradient js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/gradient/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/gradient
```

#### NPM

```javascript
npm i @pluginjs/gradient
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/gradient/dist/gradient.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gradient/dist/gradient.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/gradient/dist/gradient.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gradient/dist/gradient.min.css">
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
import Gradient from "@pluginjs/gradient"
import "@pluginjs/gradient/dist/gradient.css"

Gradient.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/gradient/dist/gradient.css")
const Gradient = require("@pluginjs/gradient")

Gradient.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/gradient/dist/gradient.css">
  <script async src="https://unpkg.com/@pluginjs/gradient/dist/gradient.js"></script>
</head>
```

```javascript
Pj.gradient('.element', options);
```

---

## API

### Options

Options are called on gradient instances through the gradient options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"prefixes"` | Set prefixes | `[&quot;-webkit-&quot;,&quot;-moz-&quot;,&quot;-ms-&quot;,&quot;-o-&quot;]`
`"forceStandard"` | Set forceStandard | `true`
`"angleUseKeyword"` | Set angleUseKeyword | `true`
`"emptyString"` | Set emptyString | ``
`"degradationFormat"` | Set degradationFormat | `false`
`"cleanPosition"` | Set cleanPosition | `true`
`"color"` | Set color | `{&quot;format&quot;:false,&quot;hexUseName&quot;:false,&quot;reduceAlpha&quot;:true,&quot;shortenHex&quot;:true,&quot;zeroAlphaAsTransparent&quot;:false,&quot;invalidValue&quot;:{&quot;r&quot;:0,&quot;g&quot;:0,&quot;b&quot;:0,&quot;a&quot;:1}}`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/gradient is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/gradient project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
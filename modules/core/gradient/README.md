# Gradient
> A flexible modern gradient js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### NPM
```javascript
npm i @pluginjs/gradient
```
#### Yarn
```javascript
yarn add @pluginjs/gradient
```

### Dependencies
- jQuery
- @pluginjs/pluginjs

---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import gradient from "@pluginjs/gradient"
```

CommonJS
```javascript
require("@pluginjs/gradient")
```

**CDN:**
Development:
```html
<script src="/path/to/gradient.js"></script>
<link rel="stylesheet" href="/path/to/gradient.css">
```
Production:
```html
<script src="/path/to/gradient.min.js"></script>
<link rel="stylesheet" href="/path/to/gradient.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
JS:
```javascript
Pj.gradient('.element', options);
```
---
## API

### Options:
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

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/thecreaction/plugin.js/releases).

## Version
Version: 0.2.18

## Copyright and license
Copyright (C) 2017 Creation Studio Limited.

Licensed under [the GPL-v3 license](LICENSE).
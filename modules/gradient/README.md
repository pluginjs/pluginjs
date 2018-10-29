# Gradient

[![npm package](https://img.shields.io/npm/v/@pluginjs/gradient.svg)](https://www.npmjs.com/package/@pluginjs/gradient)

A flexible modern gradient js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/gradient/samples)**

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

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/gradient/dist/gradient.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/gradient/dist/gradient.min.js"></script>
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Gradient from "@pluginjs/gradient"

Gradient.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
const Gradient = require("@pluginjs/gradient")

Gradient.of(document.querySelector('.element'), options)
```

Browser:

```html
<script src="https://unpkg.com/@pluginjs/gradient/dist/gradient.js"></script>
<script>
  Pj.gradient('.element', options)
</script>
```

## API

### Options

Options are called on gradient instances through the gradient options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"prefixes"` | Set prefixes | `["-webkit-","-moz-","-ms-","-o-"]`
`"forceStandard"` | Set forceStandard | `true`
`"angleUseKeyword"` | Set angleUseKeyword | `true`
`"emptyString"` | Set emptyString | ``
`"degradationFormat"` | Set degradationFormat | `false`
`"cleanPosition"` | Set cleanPosition | `true`
`"color"` | Set color | `{"format":false,"hexUseName":false,"reduceAlpha":true,"shortenHex":true,"zeroAlphaAsTransparent":false,"invalidValue":{"r":0,"g":0,"b":0,"a":1}}`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/gradient is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/gradient project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
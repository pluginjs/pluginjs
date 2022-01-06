
# Qrcode

[![npm package](https://img.shields.io/npm/v/@pluginjs/qrcode.svg)](https://www.npmjs.com/package/@pluginjs/qrcode)

A flexible modern qrcode js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/qrcode/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/qrcode
```

#### NPM

```javascript
npm i @pluginjs/qrcode
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/qrcode/dist/qrcode.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/qrcode/dist/qrcode.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/qrcode/dist/qrcode.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/qrcode/dist/qrcode.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import qrcode from "@pluginjs/qrcode"
import "@pluginjs/qrcode/dist/qrcode.css"

qrcode.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/qrcode/dist/qrcode.css")
const qrcode = require("@pluginjs/qrcode")

qrcode.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/qrcode/dist/qrcode.css">
<script src="https://unpkg.com/@pluginjs/qrcode/dist/qrcode.js"></script>
<script>
  Pj.qrcode('.element', options)
</script>
```

## API

### Options

Options are called on qrcode instances through the qrcode options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"text"` | QR Code content. | ``
`"padding"` | white space padding. | `10`
`"width"` | QR Code width in pixels | `256`
`"height"` | QR Code height in pixels | `256`
`"reverse"` | Use parent background as background | `false` 
`"background"` | color of background, color name or hex string. | `#000000`
`"foreground"` | color of modules, color name or hex string. | `#ffffff`
`"correctLevel"` | error correction level. | `L`, `M`, `H`, `Q`

More options references the [jrQrcode's options](https://github.com/diamont1001/jrQrcode).

### Events

Events are called on qrcode instances through the qrcode events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on qrcode instances through the qrcode method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"destroy"` | Destroy plugin

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/qrcode is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/qrcode project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
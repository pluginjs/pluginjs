# Parallax

[![npm package](https://img.shields.io/npm/v/@pluginjs/parallax.svg)](https://www.npmjs.com/package/@pluginjs/parallax)

A flexible modern parallax js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/parallax/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/parallax
```

#### NPM

```javascript
npm i @pluginjs/parallax
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/parallax/dist/parallax.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/parallax/dist/parallax.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/parallax/dist/parallax.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/parallax/dist/parallax.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Parallax from "@pluginjs/parallax"
import "@pluginjs/parallax/dist/parallax.css"

Parallax.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/parallax/dist/parallax.css")
const Parallax = require("@pluginjs/parallax")

Parallax.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/parallax/dist/parallax.css">
<script src="https://unpkg.com/@pluginjs/parallax/dist/parallax.js"></script>
<script>
  Pj.parallax('.element', options)
</script>
```

## API

### Options

Options are called on parallax instances through the parallax options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"container"` | Set container | `null`
`"direction"` | Set direction ['vertical', 'horizontal'] | `vertical`
`"type"` | Set type ['scroll', 'opacity', 'scale'] | `scroll`
`"speed"` | Set speed [-1 ~ 1] | `0.5`
`"mode"` | Set mode ['background', 'image'] | `background`
`"image"` | Set image [null, src, {}] | `null`
`"video"` | Set video [null, {}] | `null`
`"loader"` | Set loader [true, false, {}] | `true`

### Events

Events are called on parallax instances through the parallax events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"enter"` | Gets fired when plugin has enter viewport
`"leave"` | Gets fired when plugin has leave viewport

### Methods

Methods are called on parallax instances through the parallax method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"setSpeed"` | Set value of setSpeed
`"getSpeed"` | Get value of getSpeed

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-parallax`
`"CONTAINER"` | Declare plugin container node | `{namespace}-container`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/parallax is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/parallax project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
# AnimateText

[![npm package](https://img.shields.io/npm/v/@pluginjs/animate-text.svg)](https://www.npmjs.com/package/@pluginjs/animate-text)

A flexible modern animate-text js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/animateText/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/animate-text
```

#### NPM

```javascript
npm i @pluginjs/animate-text
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/animate-text/dist/animate-text.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/animate-text/dist/animate-text.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/animate-text/dist/animate-text.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/animate-text/dist/animate-text.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import AnimateText from "@pluginjs/animate-text"
import "@pluginjs/animate-text/dist/animate-text.css"

AnimateText.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/animate-text/dist/animate-text.css")
const AnimateText = require("@pluginjs/animate-text")

AnimateText.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/animate-text/dist/animate-text.css">
<script src="https://unpkg.com/@pluginjs/animate-text/dist/animate-text.js"></script>
<script>
  Pj.animateText('.element', options)
</script>
```

## API

### Options

Options are called on animateText instances through the animateText options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"mode"` | Set mode options | `fadeDown`
`"loop"` | Set loop options | `true`
`"delay"` | Set delay options | `0`
`"duration"` | Set duretion | `1000`

### Events

Events are called on animateText instances through the animateText events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on animateText instances through the animateText method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"value"` | Get value
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"set"` | Set value by key

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `as-animateText`
`"CONTAINER"` | Declare plugin range | `{namespace}-multiple `

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/animate-text is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/animate-text project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
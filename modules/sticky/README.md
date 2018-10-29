# Sticky

[![npm package](https://img.shields.io/npm/v/@pluginjs/sticky.svg)](https://www.npmjs.com/package/@pluginjs/sticky)

A flexible modern sticky js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/sticky/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/sticky
```

#### NPM

```javascript
npm i @pluginjs/sticky
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/sticky/dist/sticky.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/sticky/dist/sticky.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/sticky/dist/sticky.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/sticky/dist/sticky.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Sticky from "@pluginjs/sticky"
import "@pluginjs/sticky/dist/sticky.css"

Sticky.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/sticky/dist/sticky.css")
const Sticky = require("@pluginjs/sticky")

Sticky.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/sticky/dist/sticky.css">
<script src="https://unpkg.com/@pluginjs/sticky/dist/sticky.js"></script>
<script>
  Pj.sticky('.element', options)
</script>
```

## API

### Options

Options are called on sticky instances through the sticky options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"verticalPosition"` | top or down | `top`
`"spacing"` | Space when sticky, value must number | `0`
`"templates"` | Element templates | `{}`

### Events

Events are called on sticky instances through the sticky events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on sticky instances through the sticky method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-sticky`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"PARENT"` | Announce element is parent | `{namespace}-parent`
`"STICKY"` | Announce element is sticky | `{namespace}-sticky`
`"STUCK"` | Announce element is stuck | `{namespace}-stuck`
`"WRAP"` | Announce element is wrap | `{namespace}-wrap`
`"DEFAULT"` | Announce element is default | `{namespace}-default`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/sticky is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/sticky project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
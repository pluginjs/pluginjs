# Loader

[![npm package](https://img.shields.io/npm/v/@pluginjs/loader.svg)](https://www.npmjs.com/package/@pluginjs/loader)

A flexible modern loader js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/loader/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/loader
```

#### NPM

```javascript
npm i @pluginjs/loader
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/loader/dist/loader.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/loader/dist/loader.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/loader/dist/loader.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/loader/dist/loader.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Loader from "@pluginjs/loader"
import "@pluginjs/loader/dist/loader.css"

Loader.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/loader/dist/loader.css")
const Loader = require("@pluginjs/loader")

Loader.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/loader/dist/loader.css">
<script src="https://unpkg.com/@pluginjs/loader/dist/loader.js"></script>
<script>
  Pj.loader('.element', options)
</script>
```

## API

### Options

Options are called on loader instances through the loader options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`

### Events

Events are called on loader instances through the loader events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hide

### Methods

Methods are called on loader instances through the loader method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-loader`
`"THEME"` | Declare plugin theme | `{namespace}s--{theme}`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"HIDDEN"` | Announce plugin is hidden | `{namespace}-hidden`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/loader is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/loader project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# ImagesLoader

[![npm package](https://img.shields.io/npm/v/@pluginjs/images-loader.svg)](https://www.npmjs.com/package/@pluginjs/images-loader)

A flexible modern images-loader js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/imageLoader/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/images-loader
```

#### NPM

```javascript
npm i @pluginjs/images-loader
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/images-loader/dist/images-loader.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/images-loader/dist/images-loader.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/images-loader/dist/images-loader.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/images-loader/dist/images-loader.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ImagesLoader from "@pluginjs/images-loader"
import "@pluginjs/images-loader/dist/images-loader.css"

ImagesLoader.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/images-loader/dist/images-loader.css")
const ImagesLoader = require("@pluginjs/images-loader")

ImagesLoader.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/images-loader/dist/images-loader.css">
<script src="https://unpkg.com/@pluginjs/images-loader/dist/images-loader.js"></script>
<script>
  Pj.imagesLoader('.element', options)
</script>
```

## API

### Options

Options are called on imageLoader instances through the imageLoader options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"selector"` | Img selector | `img`

### Events

Events are called on imageLoader instances through the imageLoader events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on imageLoader instances through the imageLoader method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"load"` | Load image file
`"onComplete"` | Get whether image was loaded
`"finally"` | Get is finally
`"onLoaded"` | Set onLoaded callback
`"onError"` | Set error callback
`"add"` | Add image
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-imageLoader`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/images-loader is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/images-loader project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
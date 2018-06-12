# ImageLoader

[![npm package](https://img.shields.io/npm/v/@pluginjs/image-loader.svg)](https://www.npmjs.com/package/@pluginjs/image-loader)

A flexible modern image-loader js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/imageLoader/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/image-loader
```

#### NPM

```javascript
npm i @pluginjs/image-loader
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.min.css">
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
import ImageLoader from "@pluginjs/image-loader"
import "@pluginjs/image-loader/dist/image-loader.css"

ImageLoader.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/image-loader/dist/image-loader.css")
const ImageLoader = require("@pluginjs/image-loader")

ImageLoader.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.css">
<script src="https://unpkg.com/@pluginjs/image-loader/dist/image-loader.js"></script>
<script>
  Pj.imageLoader('.element', options)
</script>
```

---

## API

### Options

Options are called on imageLoader instances through the imageLoader options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"selector"` | Img selector | `img`

### Events

Events are called on imageLoader instances through the imageLoader events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on imageLoader instances through the imageLoader method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"load"` | Load image file
`"isDone"` | Get whether image was loaded
`"isFailed"` | Get whether image was load failed
`"isFinally"` | Get is finally
`"onProgress"` | Set onProgress callback
`"add"` | Add image
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-imagePicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/image-loader is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/image-loader project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
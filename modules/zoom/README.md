# Zoom

[![npm package](https://img.shields.io/npm/v/@pluginjs/zoom.svg)](https://www.npmjs.com/package/@pluginjs/zoom)

A flexible modern zoom js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/zoom/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/zoom
```

#### NPM

```javascript
npm i @pluginjs/zoom
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/zoom/dist/zoom.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/zoom/dist/zoom.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/zoom/dist/zoom.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/zoom/dist/zoom.min.css">
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
import Zoom from "@pluginjs/zoom"
import "@pluginjs/zoom/dist/zoom.css"

Zoom.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/zoom/dist/zoom.css")
const Zoom = require("@pluginjs/zoom")

Zoom.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/zoom/dist/zoom.css">
  <script async src="https://unpkg.com/@pluginjs/zoom/dist/zoom.js"></script>
</head>
```

```javascript
Pj.zoom('.element', options);
```

---

## API

### Options

Options are called on zoom instances through the zoom options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"type"` | Set type | `window`
`"animation"` | Set animation | `true`
`"level"` | Set level | `1`
`"window"` | Set window | `{&quot;clickOpen&quot;:false,&quot;height&quot;:&quot;400&quot;,&quot;width&quot;:&quot;400&quot;,&quot;borderSize&quot;:&quot;1&quot;,&quot;borderColor&quot;:&quot;black&quot;,&quot;position&quot;:1,&quot;offetY&quot;:0,&quot;offetX&quot;:0,&quot;lensSize&quot;:200,&quot;lensBorderSize&quot;:1,&quot;lensBorderColor&quot;:&quot;&quot;,&quot;lensColor&quot;:&quot;&quot;,&quot;lensOpacity&quot;:&quot;&quot;,&quot;overlay&quot;:false,&quot;overlayColor&quot;:&quot;&quot;,&quot;overlayOpacity&quot;:&quot;&quot;}`
`"lens"` | Set lens | `{&quot;color&quot;:&quot;&quot;,&quot;opacity&quot;:&quot;&quot;,&quot;size&quot;:200,&quot;borderSize&quot;:&quot;5&quot;,&quot;borderColor&quot;:&quot;#fff&quot;,&quot;lensShape&quot;:&quot;round&quot;,&quot;flexWidth&quot;:false}`
`"templates"` | Set default templates | `{}`

### Events

Events are called on zoom instances through the zoom events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"loadingShow"` | Gets fired when plugin has loadingShow
`"loadingHide"` | Gets fired when plugin has loadingHide
`"loadingError"` | Gets fired when plugin has loadingError
`"enter"` | Gets fired when plugin has enter
`"leave"` | Gets fired when plugin has leave

### Methods

Methods are called on zoom instances through the zoom method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"changePosition"` | Set value of changePosition
`"destroy"` | Destroy plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-zoom`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLE"` | Declare plugin disable | `{namespace}-disable`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"LENS"` | Declare plugin lens | `{namespace}-lens`
`"TINT"` | Declare plugin tint | `{namespace}-tint`
`"LOADING"` | Declare plugin loading | `{namespace}-loading`
`"WINDOW"` | Declare plugin window | `{namespace}-window`
`"WINDOWIMAGE"` | Declare plugin windowimage | `{namespace}-windowImage`
`"OVERLAY"` | Declare plugin overlay | `{namespace}-overlay`
`"LENSIMAGE"` | Declare plugin lensimage | `{namespace}-lensImage`
`"OVERLAYCONTAINER"` | Declare plugin overlaycontainer | `{namespace}-overlayContainer`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/zoom is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/zoom project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
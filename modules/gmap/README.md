# Gmap

[![npm package](https://img.shields.io/npm/v/@pluginjs/gmap.svg)](https://www.npmjs.com/package/@pluginjs/gmap)

A flexible modern gmap js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/gmap/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/gmap
```

#### NPM

```javascript
npm i @pluginjs/gmap
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/gmap/dist/gmap.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gmap/dist/gmap.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/gmap/dist/gmap.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gmap/dist/gmap.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Gmap from "@pluginjs/gmap"
import "@pluginjs/gmap/dist/gmap.css"

Gmap.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/gmap/dist/gmap.css")
const Gmap = require("@pluginjs/gmap")

Gmap.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/gmap/dist/gmap.css">
<script src="https://unpkg.com/@pluginjs/gmap/dist/gmap.js"></script>
<script>
  Pj.gmap('.element', options)
</script>
```

## API

### Options

Options are called on gmap instances through the gmap options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"apiKey"` | Set apiKey | ``
`"mapType"` | Set mapType | `ROADMAP`
`"backgroundColor"` | Set background color | `#e5e3df`
`"defaultUI"` | Set default UI | `true`
`"doubleClickZoom"` | Set double click zoom | `false`
`"mapTypeControl"` | Set mapTypeControl | `true`
`"maxZoom"` | Set maxZoom | `null`
`"minZoom"` | Set maxZoom | `null`
`"panControl"` | Set panControl | `false`
`"rotateControl"` | Set rotateControl | `false`
`"scaleControl"` | Set scaleControl | `false`
`"scrollwheel"` | Set scrollwheel | `false`
`"streetViewControl"` | Set streetViewControl | `false`
`"styles"` | Set styles | `false`
`"zoom"` | Set zoom | `3`
`"zoomControl"` | Set zoomControl | `true`
`"controlsPositions"` | Set controlsPositions | `{"mapType":null,"pan":null,"rotate":null,"scale":null,"streetView":null,"zoom":null}`
`"latitude"` | Set latitude | `null`
`"longitude"` | Set longitude | `null`
`"address"` | Set address | ``
`"markers"` | Set markers | `[]`
`"icon"` | Set default icon | `{"url":"http://www.google.com/mapfiles/marker.png","size":[20,34],"anchor":[9,34]}`
`"marker"` | Set marker | `true`
`"content"` | Set content | ``
`"popup"` | Set poup | `true`
`"libraries"` | Set libraries | `null`
`"onInit"` | Set onInit | `null`
`"onReady"` | Set onReady | `null`

### Events

Events are called on gmap instances through the gmap events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on gmap instances through the gmap method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"addMarker"` | Destroy plugin
`"addMarkers"` | Add value of addMarkers
`"removerMarker"` | Remove value of removerMarker
`"clearMarkers"` | Clear value of markers

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `as-gmap`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"CONTENT"` | Declare plugin content | `{namespace}-content`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/gmap is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/gmap project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
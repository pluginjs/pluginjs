# Hotspots

[![npm package](https://img.shields.io/npm/v/@pluginjs/hotspots.svg)](https://www.npmjs.com/package/@pluginjs/hotspots)

A flexible modern hotspots js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/hotspots/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/hotspots
```

#### NPM

```javascript
npm i @pluginjs/hotspots
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/hotspots/dist/hotspots.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/hotspots/dist/hotspots.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/hotspots/dist/hotspots.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/hotspots/dist/hotspots.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Hotspots from "@pluginjs/hotspots"
import "@pluginjs/hotspots/dist/hotspots.css"

Hotspots.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/hotspots/dist/hotspots.css")
const Hotspots = require("@pluginjs/hotspots")

Hotspots.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/hotspots/dist/hotspots.css">
<script src="https://unpkg.com/@pluginjs/hotspots/dist/hotspots.js"></script>
<script>
  Pj.hotspots('.element', options)
</script>
```

## API

### Options

Options are called on hotspots instances through the hotspots options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"data"` | Set data | `[]`
`"popover"` | Set popover | `{"theme":"hotspot","placement":"top","trigger":"hover focus","hideOutClick":true,"delay":0,"close":false,"html":true}`
`"type"` | Set type | `dot`
`"icon"` | Set default icon | ``
`"templates"` | Set default templates | `{}`

### Events

Events are called on hotspots instances through the hotspots events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"hover"` | Gets fired when plugin has hover
`"hovered"` | Gets fired when plugin has hovered
`"hotspotHover"` | Gets fired when plugin has hotspotHover
`"hotspotHovered"` | Gets fired when plugin has hotspotHovered
`"popoverShow"` | Gets fired when plugin has popoverShow
`"popoverShown"` | Gets fired when plugin has popoverShon
`"popoverInserted"` | Gets fired when plugin has popoverInserted
`"popoverHide"` | Gets fired when plugin has popoverHide
`"popoverHidden"` | Gets fired when plugin has popoverHiden

### Methods

Methods are called on hotspots instances through the hotspots method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"value"` | Get value
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-hotspot`
`"CONTAINER"` | Declare plugin range | `{namespace}s`
`"HOVERING"` | Announce plugin is hoverd | `{namespace}s-hovering`
`"DISABLED"` | Announce plugin is disabled | `{namespace}s-disabled`
`"HOTSPOT"` | Declare plugin hotspot | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"TYPE"` | Declare plugin type | `{namespace}--{type}`
`"DOT"` | Declare plugin dot | `{namespace}-dot`
`"ICON"` | Declare plugin icon | `{namespace}-icon`
`"TEXT"` | Declare plugin text | `{namespace}-text`
`"HOTSPOTHOVERING"` | Declare plugin hotspothovering | `{namespace}-hovering`
`"HOTSPOTACTIVE"` | Declare plugin hotspotactive | `{namespace}-active`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/hotspots is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/hotspots project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# Draggable

[![npm package](https://img.shields.io/npm/v/@pluginjs/draggable.svg)](https://www.npmjs.com/package/@pluginjs/draggable)

A flexible modern draggable js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/draggable/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/draggable
```

#### NPM

```javascript
npm i @pluginjs/draggable
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/draggable/dist/draggable.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/draggable/dist/draggable.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/draggable/dist/draggable.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/draggable/dist/draggable.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Draggable from "@pluginjs/draggable"
import "@pluginjs/draggable/dist/draggable.css"

Draggable.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/draggable/dist/draggable.css")
const Draggable = require("@pluginjs/draggable")

Draggable.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/draggable/dist/draggable.css">
<script src="https://unpkg.com/@pluginjs/draggable/dist/draggable.js"></script>
<script>
  Pj.draggable('.element', options)
</script>
```

## API

### Options

Options are called on draggable instances through the draggable options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"container"` | Contains movement to the bounds of the element | `null`
`"grid"` | Snaps the element to a grid | `[0, 0]`
`"axis"` | Constrains movement to horizontal or vertical axis | `null`

### Events

Events are called on draggable instances through the draggable events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"dragstart"` | Gets fired when plugin has be dragstart
`"dragmove"` | Gets fired when plugin has be dragmove
`"dragend"` | Gets fired when plugin has be dragend
`"pointer"` | Gets fired when plugin has be pointer

### Methods

Methods are called on draggable instances through the draggable method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"setPosition"` | Set dragPosition by key
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-draggable`
`"VERTICAL"` | Declare plugin vertical | `{namespace}-vertical`
`"HORIZONTAL"` | Declare plugin horizontal | `{namespace}-horizontal`
`"GRID"` | Declare plugin grid node | `{namespace}-grid`
`"DISABLED"` | Declare plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/draggable is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/draggable project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
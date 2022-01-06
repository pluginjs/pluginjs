# Scrollbar

[![npm package](https://img.shields.io/npm/v/@pluginjs/scrollbar.svg)](https://www.npmjs.com/package/@pluginjs/scrollbar)

A flexible modern scrollbar js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/scrollbar/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/scrollbar
```

#### NPM

```javascript
npm i @pluginjs/scrollbar
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/scrollbar/dist/scrollbar.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scrollbar/dist/scrollbar.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/scrollbar/dist/scrollbar.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scrollbar/dist/scrollbar.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Scrollbar from "@pluginjs/scrollbar"
import "@pluginjs/scrollbar/dist/scrollbar.css"

Scrollbar.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/scrollbar/dist/scrollbar.css")
const Scrollbar = require("@pluginjs/scrollbar")

Scrollbar.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scrollbar/dist/scrollbar.css">
<script src="https://unpkg.com/@pluginjs/scrollbar/dist/scrollbar.js"></script>
<script>
  Pj.scrollbar('.element', options)
</script>
```

## API

### Options

Options are called on scrollbar instances through the scrollbar options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"handleSelector"` | Set handleSelector | `null`
`"handleTemplate"` | Set handleTemplate | `<div class="{handle}"></div>`
`"barClass"` | Set barClass | `null`
`"handleClass"` | Set handleClass | `null`
`"direction"` | Set direction | `vertical`
`"barLength"` | scroll bar default length | `null`
`"handleLength"` | Set handleLength | `null`
`"minHandleLength"` | Set minHandleLength | `30`
`"maxHandleLength"` | Set maxHandleLength | `null`
`"mouseDrag"` | Set mouseDrag | `true`
`"touchDrag"` | Set touchDrag | `true`
`"pointerDrag"` | Set touchDrag | `true`
`"clickMove"` | Set clickMove | `true`
`"clickMoveStep"` | Set clickMoveStep | `0.3`
`"mousewheel"` | Set mousserwheel | `true`
`"mousewheelSpeed"` | Set mousewheelSpeed | `50`
`"keyboard"` | Set keyboard | `true`
`"useCssTransforms3D"` | Set useCssTransforms3D | `true`
`"useCssTransforms"` | Set useCssTransforms | `true`
`"useCssTransitions"` | Set useCssTransitions | `true`
`"duration"` | Set duretion | `500`
`"easing"` | Set easing | `ease`

### Events

Events are called on scrollbar instances through the scrollbar events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"hover"` | Gets fired when plugin has hover
`"hovered"` | Gets fired when plugin has hovered
`"drag"` | Gets fired when plugin has drag
`"dragged"` | Gets fired when plugin has draged
`"change"` | Gets fired when plugin has changed
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on scrollbar instances through the scrollbar method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"moveBy"` | Get moveBy function
`"moveTo"` | Get moveTo function

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-scrollbar`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"VERTICAL"` | Declare plugin vertical | `{namespace}-vertical`
`"HORIZONTAL"` | Declare plugin horizontal | `{namespace}-horizontal`
`"CONTAINER"` | Declare plugin range | `{namespace}`
`"HANDLE"` | Declare plugin handle | `{namespace}-handle`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"DRAGGING"` | Declare plugin dragging | `{namespace}-dragging`
`"HOVERING"` | Announce plugin is hoverd | `{namespace}-hovering`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/scrollbar is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/scrollbar project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
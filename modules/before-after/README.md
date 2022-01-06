# BeforeAfter

[![npm package](https://img.shields.io/npm/v/@pluginjs/before-after.svg)](https://www.npmjs.com/package/@pluginjs/before-after)

A flexible modern before-after js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/beforeAfter/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/before-after
```

#### NPM

```javascript
npm i @pluginjs/before-after
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/before-after/dist/before-after.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/before-after/dist/before-after.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/before-after/dist/before-after.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/before-after/dist/before-after.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import BeforeAfter from "@pluginjs/before-after"
import "@pluginjs/before-after/dist/before-after.css"

BeforeAfter.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/before-after/dist/before-after.css")
const BeforeAfter = require("@pluginjs/before-after")

BeforeAfter.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/before-after/dist/before-after.css">
<script src="https://unpkg.com/@pluginjs/before-after/dist/before-after.js"></script>
<script>
  Pj.beforeAfter('.element', options)
</script>
```

## API

### Options

Options are called on beforeAfter instances through the beforeAfter options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"labelTheme"` | Set labelTheme | `null`
`"direction"` | Set is horizontal or vertical | `horizontal`
`"initial"` | Set initial options | `0.5`
`"showLabel"` | Set showLabel | `true`
`"mouseDrag"` | Set mouseDrag | `true`
`"touchDrag"` | Set touchDrag | `true`
`"pointerDrag"` | Set pointerDrag | `true`
`"clickMove"` | Set clickMove | `true`
`"duration"` | Set duretion | `500`
`"easing"` | Set easing | `easeInOut`
`"labels"` | Set labels | `{"before":"Before","after":"After"}`
`"arrows"` | Set arrows | `{"left":"fa fa-caret-left","right":"fa fa-caret-right","up":"fa fa-caret-up","down":"fa fa-caret-down"}`
`"templates"` | Set default templates | `{}`

### Events

Events are called on beforeAfter instances through the beforeAfter events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"hover"` | Gets fired when plugin has hover
`"hovered"` | Gets fired when plugin has hovered
`"drag"` | Gets fired when plugin has drag
`"dragged"` | Gets fired when plugin has dragged
`"change"` | Gets fired when plugin has changed
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on beforeAfter instances through the beforeAfter method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"moveBy"` | Get value of moveBy
`"moveTo"` | Get value of moveTo
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `as-beforeAfter`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DIRECTION"` | Declare plugin direction | `{namespace}-{direction}`
`"CONTAINER"` | Declare plugin range | `{namespace}`
`"BEFORE"` | Declare plugin before | `{namespace}-before`
`"AFTER"` | Declare plugin after | `{namespace}-after`
`"HANDLE"` | Declare plugin handle | `{namespace}-handle`
`"ARROWBEFORE"` | Declare plugin arrow before | `{namespace}-arrow-before`
`"ARROWAFTER"` | Declare plugin arrow after | `{namespace}-arrow-after`
`"LABELS"` | Declare plugin labels | `{namespace}-labels`
`"LABELTHEME"` | Declare plugin labels theme | `{namespace}-labels-{theme}`
`"LABELBEFORE"` | Declare plugin before | `{namespace}-label-before`
`"LABELAFTER"` | Declare plugin after | `{namespace}-label-after`
`"LABELHIDE"` | Declare plugin label hide | `{namespace}-label-hide`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"DRAGGING"` | Announce plugin is dragging | `{namespace}-dragging`
`"HOVERING"` | Announce plugin is hoverd | `{namespace}-hovering`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/before-after is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/before-after project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
# Swipeable

[![npm package](https://img.shields.io/npm/v/@pluginjs/swipeable.svg)](https://www.npmjs.com/package/@pluginjs/swipeable)

A flexible modern swipeable js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/swipeable/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/swipeable
```

#### NPM

```javascript
npm i @pluginjs/swipeable
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/swipeable/dist/swipeable.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/swipeable/dist/swipeable.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/swipeable/dist/swipeable.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/swipeable/dist/swipeable.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Swipeable from "@pluginjs/swipeable"
import "@pluginjs/swipeable/dist/swipeable.css"

Swipeable.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/swipeable/dist/swipeable.css")
const Swipeable = require("@pluginjs/swipeable")

Swipeable.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/swipeable/dist/swipeable.css">
<script src="https://unpkg.com/@pluginjs/swipeable/dist/swipeable.js"></script>
<script>
  Pj.swipeable('.element', options)
</script>
```

## API

### Options

Options are called on swipeable instances through the swipeable options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"container"` | Container selector | `null`
`"rebound"` | Support rebound | `false`
`"reboundPos"` | Set rebound position | `100`
`"offset"` | Set rebound offset | `0`
`"duration"` | Set duration | `400`
`"power"` | Set decay power | `2`
`"decay"` | Support decay | `false`
`"axis"` | Set direction, 'x' or 'y' | `'x'`

### Events

Events are called on swipeable instances through the swipeable events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"start"` | Gets fired when plugin has be start
`"move"` | Gets fired when plugin has be move
`"end"` | Gets fired when plugin has be end
`"resize"` | Gets fired when plugin has be resize
`"decay"` | Gets fired when plugin has be decay
`"decayend"` | Gets fired when plugin has be decayend

### Methods

Methods are called on swipeable instances through the swipeable method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-swipeable`
`"VERTICAL"` | Declare plugin vertical | `{namespace}-vertical`
`"CONTAINER"` | Declare container node | `{namespace}-container`
`"DISABLED"` | Declare plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/swipeable is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/swipeable project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
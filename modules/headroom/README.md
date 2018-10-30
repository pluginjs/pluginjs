# Headroom

[![npm package](https://img.shields.io/npm/v/@pluginjs/headroom.svg)](https://www.npmjs.com/package/@pluginjs/headroom)

A flexible modern headroom js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/headroom/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/headroom
```

#### NPM

```javascript
npm i @pluginjs/headroom
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/headroom/dist/headroom.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/headroom/dist/headroom.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/headroom/dist/headroom.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/headroom/dist/headroom.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Headroom from "@pluginjs/headroom"
import "@pluginjs/headroom/dist/headroom.css"

Headroom.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/headroom/dist/headroom.css")
const Headroom = require("@pluginjs/headroom")

Headroom.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/headroom/dist/headroom.css">
<script src="https://unpkg.com/@pluginjs/headroom/dist/headroom.js"></script>
<script>
  Pj.headroom('.element', options)
</script>
```

## API

### Options

Options are called on headroom instances through the headroom options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"tolerance"` | normalize Tolerance, Mainly used in pinned mode | `{"down":10,"up":20}`
`"offset"` | Anchor offset, Mainly used for pinned mode and stick mode | `0`
`"scroller"` | Scroll element | `window`
`"mode"` | Different judgments | `pinned`
`"offsetSide"` | If offset is an element selector, you can specify his size | `top`

### Events

Events are called on headroom instances through the headroom events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled

### Methods

Methods are called on headroom instances through the headroom method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"destroy"` | Destroy plugin
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-headroom`
`"PINNED"` | Announce plugin is pinned | `{namespace}-pinned`
`"UNPINNED"` | Announce plugin is unpinned | `{namespace}-unpinned`
`"TOP"` | Announce plugin is top | `{namespace}-top`
`"NOTTOP"` | Announce plugin is notTop | `{namespace}-notTop`
`"STICK"` | Announce plugin is stick | `{namespace}-stick`
`"UNSTICK"` | Announce plugin is unstick | `{namespace}-unstick`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/headroom is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/headroom project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
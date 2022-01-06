# Lazyload

[![npm package](https://img.shields.io/npm/v/@pluginjs/lazyload.svg)](https://www.npmjs.com/package/@pluginjs/lazyload)

A flexible modern lazyload js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/lazyload/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/lazyload
```

#### NPM

```javascript
npm i @pluginjs/lazyload
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/lazyload/dist/lazyload.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/lazyload/dist/lazyload.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/lazyload/dist/lazyload.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/lazyload/dist/lazyload.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Lazyload from "@pluginjs/lazyload"
import "@pluginjs/lazyload/dist/lazyload.css"

Lazyload.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/lazyload/dist/lazyload.css")
const Lazyload = require("@pluginjs/lazyload")

Lazyload.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/lazyload/dist/lazyload.css">
<script src="https://unpkg.com/@pluginjs/lazyload/dist/lazyload.js"></script>
<script>
  Pj.lazyload('.element', options)
</script>
```

## API

### Options

Options are called on lazyload instances through the lazyload options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"threshold"` | Set threshold | `0`
`"src"` | Set src | `null`
`"retina"` | Set retina | `false`
`"srcset"` | Set srcset | `null`
`"delay"` | Set delay | `null`
`"animation"` | Set animation | `null`

### Events

Events are called on lazyload instances through the lazyload events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"enter"` | Gets fired when plugin has enter

### Methods

Methods are called on lazyload instances through the lazyload method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"value"` | Get vaule
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"setAnimation"` | Set value of animation
`"setAnimationDelay"` | Set value of animationDelay
`"beforeLoad"` | Set value of beforeLoad
`"afterLoad"` | Set value of afterLoad
`"load"` | Set value of load
`"isLoad"` | Set value of isLoad
`"setDelay"` | Set value of delay

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/lazyload is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/lazyload project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
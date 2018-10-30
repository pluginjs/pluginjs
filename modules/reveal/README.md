# Reveal

[![npm package](https://img.shields.io/npm/v/@pluginjs/reveal.svg)](https://www.npmjs.com/package/@pluginjs/reveal)

A flexible modern reveal js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/reveal/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/reveal
```

#### NPM

```javascript
npm i @pluginjs/reveal
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/reveal/dist/reveal.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/reveal/dist/reveal.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/reveal/dist/reveal.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/reveal/dist/reveal.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Reveal from "@pluginjs/reveal"
import "@pluginjs/reveal/dist/reveal.css"

Reveal.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/reveal/dist/reveal.css")
const Reveal = require("@pluginjs/reveal")

Reveal.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/reveal/dist/reveal.css">
<script src="https://unpkg.com/@pluginjs/reveal/dist/reveal.js"></script>
<script>
  Pj.reveal('.element', options)
</script>
```

## API

### Options

Options are called on reveal instances through the reveal options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"animation"` | Animation name | `fadeIn`
`"duration"` | Animation duration | `400`
`"easing"` | Animation easing | `ease`
`"delay"` | Animation delay | `0`
`"count"` | Animation count, Numbers or infinite | `1`
`"mode"` | Animation mode, Always or once | `always`
`"mobile"` | Whether to support the mobile | `false`
`"tablet"` | Whether to support the tablet | `false`
`"anchor"` | You can set the trigger anchor, Enter the element selector | ``

### Events

Events are called on reveal instances through the reveal events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"enter"` | Gets fired when element in view
`"exit"` | Gets fired when element out view
`"disable"` | Gets fired when plugin is disabled
`"enable"` | Gets fired when plugin is enabled
`"animationEnd"` | Gets fired When stopped animation

### Methods

Methods are called on reveal instances through the reveal method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"destroy"` | Destroy plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"isVisible"` | Return is in view

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-reveal`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/reveal is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/reveal project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
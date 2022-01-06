# Arrows

[![npm package](https://img.shields.io/npm/v/@pluginjs/arrows.svg)](https://www.npmjs.com/package/@pluginjs/arrows)

A flexible modern arrows js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/arrows/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/arrows
```

#### NPM

```javascript
npm i @pluginjs/arrows
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/arrows/dist/arrows.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/arrows/dist/arrows.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/arrows/dist/arrows.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/arrows/dist/arrows.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Arrows from "@pluginjs/arrows"
import "@pluginjs/arrows/dist/arrows.css"

Arrows.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/arrows/dist/arrows.css")
const Arrows = require("@pluginjs/arrows")

Arrows.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/arrows/dist/arrows.css">
<script src="https://unpkg.com/@pluginjs/arrows/dist/arrows.js"></script>
<script>
  Pj.arrows('.element', options)
</script>
```

## API

### Options

Options are called on arrows instances through the arrows options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"prev"` | Add value of prev button | `{"href":"#","text":"Previous"}`
`"next"` | Add value of next button | `{"href":"#","text":"Next"}`
`"direction"` | Set plugin initial direction | `horizontal`
`"valueFrom"` | Set where is value from | `href`
`"templates"` | Arrows default templates | `{}`

### Events

Events are called on arrows instances through the arrows events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"next"` | Gets fired when next button has be click
`"prev"` | Gets fired when prev button has be click
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hide

### Methods

Methods are called on arrows instances through the arrows method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"build"` | Build arrows element
`"load"` | Load arrows element
`"next"` | Active next event
`"prev"` | Active prev event
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-arrow`
`"CONTAINER"` | Declare plugin range | `{namespace}s`
`"THEME"` | Declare plugin theme | `{namespace}s--{theme}`
`"PREV"` | Declare prev element | `{namespace}-prev`
`"NEXT"` | Declare next element | `{namespace}-next`
`"VERTICAL"` | Declare plugin direction is vertical | `{namespace}s-vertical`
`"HORIZONTAL"` | Declare plugin direction is horizontal | `{namespace}s-horizontal`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"HIDDEN"` | Announce plugin is hidden | `{namespace}-hidden`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/arrows is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/arrows project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
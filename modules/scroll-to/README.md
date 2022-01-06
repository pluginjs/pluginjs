# ScrollTo

[![npm package](https://img.shields.io/npm/v/@pluginjs/scroll-to.svg)](https://www.npmjs.com/package/@pluginjs/scroll-to)

A flexible modern scroll-to js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/scrollTo/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/scroll-to
```

#### NPM

```javascript
npm i @pluginjs/scroll-to
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/scroll-to/dist/scroll-to.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-to/dist/scroll-to.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/scroll-to/dist/scroll-to.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-to/dist/scroll-to.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ScrollTo from "@pluginjs/scroll-to"
import "@pluginjs/scroll-to/dist/scroll-to.css"

ScrollTo.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/scroll-to/dist/scroll-to.css")
const ScrollTo = require("@pluginjs/scroll-to")

ScrollTo.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-to/dist/scroll-to.css">
<script src="https://unpkg.com/@pluginjs/scroll-to/dist/scroll-to.js"></script>
<script>
  Pj.scrollTo('.element', options)
</script>
```

## API

### Options

Options are called on scrollTo instances through the scrollTo options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"selector"` | Set selector | `[data-scrollto]`
`"href"` | Set href | `data-scrollto`
`"duration"` | Set duretion | `500`
`"easing"` | Set easting | `ease`
`"offsetTop"` | Set offsetTop | `50`
`"mobile"` | Set mobile | `{"width":768,"duration":500,"easing":"ease"}`

### Events

Events are called on scrollTo instances through the scrollTo events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"jump"` | Gets fired when plugin has jump
`"done"` | Gets fired when plugin has done

### Methods

Methods are called on scrollTo instances through the scrollTo method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"jump"` | Set jump function
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-scrollTo`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"ANIMATING"` | Declare plugin animating | `{namespace}-animating`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/scroll-to is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/scroll-to project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
# ScrollProgress

[![npm package](https://img.shields.io/npm/v/@pluginjs/scroll-progress.svg)](https://www.npmjs.com/package/@pluginjs/scroll-progress)

A flexible modern scroll-progress js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/scrollProgress/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/scroll-progress
```

#### NPM

```javascript
npm i @pluginjs/scroll-progress
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ScrollProgress from "@pluginjs/scroll-progress"
import "@pluginjs/scroll-progress/dist/scroll-progress.css"

ScrollProgress.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/scroll-progress/dist/scroll-progress.css")
const ScrollProgress = require("@pluginjs/scroll-progress")

ScrollProgress.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.css">
<script src="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.js"></script>
<script>
  Pj.scrollProgress('.element', options)
</script>
```

## API

### Options

Options are called on scrollProgress instances through the scrollProgress options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"size"` | Define the size of Progress bar | `5`
`"color"` | Define the color of Progress bar | `#50bcb6`
`"opacity"` | Define the opacity of Progress bar, value must be between 0 and 1 | `1`
`"custom"` | Define the scroll element, the false is window, the true is element | `false`
`"appendTo"` | Define the progress bar appendTo element, value must be an element selector | `body`
`"position"` | Define the position of Progress bar(top and bottom for horizontal's position, left or right for vertical's position ) | `top-left`
`"templates"` | Template blocks | `{}`

### Events

Events are called on scrollProgress instances through the scrollProgress events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"refresh"` | Gets fired when refresh Progress bar

### Methods

Methods are called on scrollProgress instances through the scrollProgress method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"refresh"` | refresh Progress bar

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-scrollProgress`
`"BAR"` | Declare bar | `{namespace}-bar`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/scroll-progress is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/scroll-progress project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
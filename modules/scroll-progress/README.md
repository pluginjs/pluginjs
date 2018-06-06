# ScrollProgress
[![npm package](https://img.shields.io/npm/v/@pluginjs/scroll-progress.svg)](https://www.npmjs.com/package/@pluginjs/scroll-progress)

A flexible modern scroll-progress js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/scrollProgress/samples)**

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
---

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
<body>
  <div class="element"></div>
</body>
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
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.css">
  <script async src="https://unpkg.com/@pluginjs/scroll-progress/dist/scroll-progress.js"></script>
</head>
```
```javascript
Pj.scrollProgress('.element', options);
```
---
## API

### Options:
Options are called on scrollProgress instances through the scrollProgress options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"size"` | Define the size of Progress bar | `5`
`"color"` | Define the color of Progress bar | `#50bcb6`
`"opacity"` | Define the opacity of Progress bar, value must be between 0 and 1 | `1`
`"custom"` | Define the scroll element, the false is window, the true is element | `false`
`"appendTo"` | Define the progress bar appendTo element, value must be an element selector | `body`
`"position"` | Define the position of Progress bar(top and bottom for horizontal&#x27;s position, left or right for vertical&#x27;s position ) | `top-left`
`"templates"` | Template blocks | `{}`

### Events:
Events are called on scrollProgress instances through the scrollProgress events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"refresh"` | Gets fired when refresh Progress bar


### Methods:
Methods are called on scrollProgress instances through the scrollProgress method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"refresh"` | refresh Progress bar


### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-scrollProgress`
`"BAR"` | Declare bar | `{namespace}-bar`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`



---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/scroll-progress is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/scroll-progress project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
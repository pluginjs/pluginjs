# Arrows
[![npm package](https://img.shields.io/npm/v/@pluginjs/arrows.svg)](https://www.npmjs.com/package/@pluginjs/arrows)

A flexible modern arrows js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/arrows/samples)**

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
---

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
<body>
  <div class="element"></div>
</body>
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
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/arrows/dist/arrows.css">
  <script async src="https://unpkg.com/@pluginjs/arrows/dist/arrows.js"></script>
</head>
```
```javascript
Pj.arrows('.element', options);
```
---
## API

### Options:
Options are called on arrows instances through the arrows options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"prev"` | Add value of prev button | `{&quot;href&quot;:&quot;#&quot;,&quot;text&quot;:&quot;Previous&quot;}`
`"next"` | Add value of next button | `{&quot;href&quot;:&quot;#&quot;,&quot;text&quot;:&quot;Next&quot;}`
`"direction"` | Set plugin initial direction | `horizontal`
`"valueFrom"` | Set where is value from | `href`
`"templates"` | Arrows default templates | `{}`

### Events:
Events are called on arrows instances through the arrows events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"next"` | Gets fired when next button has be click
`"prev"` | Gets fired when prev button has be click
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hide


### Methods:
Methods are called on arrows instances through the arrows method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"build"` | Build arrows element
`"load"` | Load arrows element
`"next"` | Active next event
`"prev"` | Active prev event
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin


### Classes:
Name | Description | Default
-----|------|------
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



---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/arrows is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/arrows project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
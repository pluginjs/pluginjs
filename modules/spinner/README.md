# Spinner
[![npm package](https://img.shields.io/npm/v/@pluginjs/spinner.svg)](https://www.npmjs.com/package/@pluginjs/spinner)

A flexible modern spinner js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/spinner/samples)**

## Introduction
### Installation

#### Yarn
```javascript
yarn add @pluginjs/spinner
```
#### NPM
```javascript
npm i @pluginjs/spinner
```
---

## Getting Started

**CDN:**

Development:
```html
<script src="https://unpkg.com/@pluginjs/spinner/dist/spinner.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/spinner/dist/spinner.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/spinner/dist/spinner.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/spinner/dist/spinner.min.css">
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
import Spinner from "@pluginjs/spinner"
import "@pluginjs/spinner/dist/spinner.css"

Spinner.of(document.querySelector('.element'), options)
```
CommonJS:
```javascript
require("@pluginjs/spinner/dist/spinner.css")
const Spinner = require("@pluginjs/spinner")

Spinner.of(document.querySelector('.element'), options)
```
Browser:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/spinner/dist/spinner.css">
  <script async src="https://unpkg.com/@pluginjs/spinner/dist/spinner.js"></script>
</head>
```
```javascript
Pj.spinner('.element', options);
```
---
## API

### Options:
Options are called on spinner instances through the spinner options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"disabled"` | Disabled plugin | `false`
`"min"` | Set plugin min option | `0`
`"max"` | Set plugin max option | `100`
`"step"` | Set plugin step option | `1`
`"name"` | Set plugin name option | `null`
`"precision"` | Set plugin precision option | `0`
`"rule"` | Set plugin rule option | `null`
`"unit"` | Set plugin unit option | `null`
`"layout"` | Set plugin layout option | `both`
`"looping"` | Set plugin looping option | `true`
`"mousewheel"` | Set plugin mousewheel option | `false`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events:
Events are called on spinner instances through the spinner events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed


### Methods:
Methods are called on spinner instances through the spinner method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"update"` | Update plugin
`"spinDown"` | Get value of subtraction
`"spinUp"` | Get value of add


### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-spinner`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"FOCUS"` | Declare plugin focus | `{namespace}-focus`
`"CONTROL"` | Declare plugin control | `{namespace}-control`
`"DOWN"` | Declare plugin down | `{namespace}-down`
`"UP"` | Declare plugin up | `{namespace}-up`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"CONTROLRIGHT"` | Declare plugin control right | `{namespace}-control-right`



### Dependencies:
- `[object Object]`
- `[object Object]`

---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License
@pluginjs/spinner is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/spinner project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright
Copyright (C) 2018 Creation Studio Limited.
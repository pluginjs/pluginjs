# SvgProgress
> A flexible modern svg-progress js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/svg-progress
```
#### NPM
```javascript
npm i @pluginjs/svg-progress
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import svgProgress from "@pluginjs/svg-progress"
```

CommonJS
```javascript
require("@pluginjs/svg-progress")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/svg-progress.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/svg-progress.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/svg-progress.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/svg-progress.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
JS:
```javascript
Pj.svgProgress('.element', options);
```
---
## API

### Options:
Options are called on svgProgress instances through the svgProgress options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"min"` | Set min value | `0`
`"max"` | Set max value | `100`
`"goal"` | Set goal value | `100`
`"size"` | Set size value | `80`
`"speed"` | Set progress speed value | `15`
`"barcolor"` | Set progress bar color | `#55a4f2`
`"barsize"` | Set progress bar size | `4`
`"trackcolor"` | Set track bar color | `#f7f9fc`
`"fillcolor"` | Set fill color (default none) | `none`
`"easing"` | Set easing animation | `ease`
`"numberCallback"` | Set number call back function | `function() {...}`
`"contentCallback"` | Set content call back function | `null`

### Events:
Events are called on svgProgress instances through the svgProgress events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"start"` | Gets fired when plugin has start
`"go"` | Gets fired when plugin has goes
`"reset"` | Gets fired when plugin has be reset
`"stop"` | Gets fired when progress has stop
`"finish"` | Gets fired when plugin has finish
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled

```
### Methods:
Methods are called on svgProgress instances through the svgProgress method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"start"` | Start to progress
`"finish"` | Finish progress
`"stop"` | Stop progress
`"reset"` | Reset progress
`"go"` | Go the specified progress by value
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$svgProgress('.element', get)
Pj.$svgProgress('.element', get, "foo")
Pj.$svgProgress('.element', get, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-svgProgress`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"SVG"` | Declare svg node | `{namespace}-svg`
`"ELEMENT"` | Declare svgProgress element | `{namespace}`
`"NUMBER"` | Declare number node | `{namespace}-number`
`"CONTENT"` | Declare content | `{namespace}-content`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"INFOS"` | Declare info | `{namespace}-infos`



---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/plugin/plugin.js/releases).

## Version
Version: 0.2.18

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
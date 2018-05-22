# ScrollProgress
> A flexible modern scroll-progress js plugin.
## Introduction

#### [Demo]()
---
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
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import scrollProgress from "@pluginjs/scroll-progress"
```

CommonJS
```javascript
require("@pluginjs/scroll-progress")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-progress.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-progress.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-progress.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-progress.min.css">
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

```
### Methods:
Methods are called on scrollProgress instances through the scrollProgress method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"refresh"` | refresh Progress bar

**example:**
```javascript
Pj.$scrollProgress('.element', enable)
Pj.$scrollProgress('.element', enable, "foo")
Pj.$scrollProgress('.element', enable, "foo", "bar")
```

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
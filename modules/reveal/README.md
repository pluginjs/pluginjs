# Reveal
> A flexible modern reveal js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/reveal
```
#### NPM
```javascript
npm i @pluginjs/reveal
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import reveal from "@pluginjs/reveal"
```

CommonJS
```javascript
require("@pluginjs/reveal")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/reveal.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/reveal.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/reveal.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/reveal.min.css">
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
Pj.reveal('.element', options);
```
---
## API

### Options:
Options are called on reveal instances through the reveal options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"animation"` | Animation name | `fadeIn`
`"duration"` | Animation duration | `400`
`"easing"` | Animation easing | `ease`
`"delay"` | Animation delay | `0`
`"count"` | Animation count, Numbers or infinite | `1`
`"mode"` | Animation mode, Always or once | `always`
`"mobile"` | Whether to support the mobile | `false`
`"tablet"` | Whether to support the tablet | `false`
`"anchor"` | You can set the trigger anchor, Enter the element selector | ``

### Events:
Events are called on reveal instances through the reveal events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"enter"` | Gets fired when element in view
`"exit"` | Gets fired when element out view
`"disable"` | Gets fired when plugin is disabled
`"enable"` | Gets fired when plugin is enabled
`"animationEnd"` | Gets fired When stopped animation

```
### Methods:
Methods are called on reveal instances through the reveal method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"isVisible"` | Return is in view

**example:**
```javascript
Pj.$reveal('.element', destroy)
Pj.$reveal('.element', destroy, "foo")
Pj.$reveal('.element', destroy, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-reveal`
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
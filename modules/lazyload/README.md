# Lazyload
> A flexible modern lazyload js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/lazyload
```
#### NPM
```javascript
npm i @pluginjs/lazyload
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import lazyload from "@pluginjs/lazyload"
```

CommonJS
```javascript
require("@pluginjs/lazyload")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/lazyload.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/lazyload.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/lazyload.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/lazyload.min.css">
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
Pj.lazyload('.element', options);
```
---
## API

### Options:
Options are called on lazyload instances through the lazyload options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"threshold"` | Set threshold | `0`
`"src"` | Set src | `null`
`"retina"` | Set retina | `false`
`"srcset"` | Set srcset | `null`
`"delay"` | Set delay | `null`
`"animation"` | Set animation | `null`

### Events:
Events are called on lazyload instances through the lazyload events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"enter"` | Gets fired when plugin has enter

```
### Methods:
Methods are called on lazyload instances through the lazyload method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"value"` | Get vaule
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"setAnimation"` | Set value of animation
`"setAnimationDelay"` | Set value of animationDelay
`"beforeLoad"` | Set value of beforeLoad
`"afterLoad"` | Set value of afterLoad
`"load"` | Set value of load
`"isLoad"` | Set value of isLoad
`"setDelay"` | Set value of delay

**example:**
```javascript
Pj.$lazyload('.element', value)
Pj.$lazyload('.element', value, "foo")
Pj.$lazyload('.element', value, "foo", "bar")
```



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
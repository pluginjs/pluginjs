# AdaptText
> A flexible modern adapt-text js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/adapt-text
```
#### NPM
```javascript
npm i @pluginjs/adapt-text
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import adaptText from "@pluginjs/adapt-text"
```

CommonJS
```javascript
require("@pluginjs/adapt-text")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/adapt-text.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/adapt-text.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/adapt-text.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/adapt-text.min.css">
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
Pj.adaptText('.element', options);
```
---
## API

### Options:
Options are called on adaptText instances through the adaptText options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"ratio"` | AdaptText ratio value | `10`
`"max"` | Max value | `Infinity`
`"min"` | Min value | `-Infinity`
`"scrollable"` | Can be scroll or not | `false`
`"scrollSpeed"` | factor of scroll speed | `1200`
`"scrollResetSpeed"` | Reset threshold of scroll speed | `300`
`"resize"` | Can be resize or not | `true`

### Events:
Events are called on adaptText instances through the adaptText events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

```
### Methods:
Methods are called on adaptText instances through the adaptText method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"resize"` | Resize handle

**example:**
```javascript
Pj.$adaptText('.element', enable)
Pj.$adaptText('.element', enable, "foo")
Pj.$adaptText('.element', enable, "foo", "bar")
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
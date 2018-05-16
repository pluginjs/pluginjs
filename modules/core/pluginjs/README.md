# Core
> A flexible modern core js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### NPM
```javascript
npm i @pluginjs/pluginjs
```
#### Yarn
```javascript
yarn add @pluginjs/pluginjs
```

### Dependencies
- jQuery
- @pluginjs/pluginjs

---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import core from "@pluginjs/pluginjs"
```

CommonJS
```javascript
require("@pluginjs/pluginjs")
```

**CDN:**
Development:
```html
<script src="/path/to/core.js"></script>
<link rel="stylesheet" href="/path/to/core.css">
```
Production:
```html
<script src="/path/to/core.min.js"></script>
<link rel="stylesheet" href="/path/to/core.min.css">
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
Pj.Core('.element', options);
// or jquery way
$('.element').plugin('Core', options);
```
---
## API


### Methods:
Methods are called on core instances through the core method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"themeable"` | Make plugin themeable
`"styleable"` | Make plugin styleable
`"eventable"` | Make plugin eventable
`"stateable"` | Make plugin stateable
`"register"` | Register plugin to core
`"translateable"` | Make plugin translateable

**example:**
```javascript
$core.plugin('Core', register)
$core.plugin('Core', register, "foo")
$core.plugin('Core', register, "foo", "bar")
```



### Dependencies:
- `component`

---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/plugin.js/releases).

## Version
Version: 0.0.1

## Copyright and license
Copyright (C) 2017 Creation Studio Limited.

Licensed under [the GPL-v3 license](LICENSE).
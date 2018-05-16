# Component
> A flexible modern component js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### NPM
```javascript
npm i @pluginjs/component
```
#### Yarn
```javascript
yarn add @pluginjs/component
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
import component from "@pluginjs/component"
```

CommonJS
```javascript
require("@pluginjs/component")
```

**CDN:**
Development:
```html
<script src="/path/to/component.js"></script>
<link rel="stylesheet" href="/path/to/component.css">
```
Production:
```html
<script src="/path/to/component.min.js"></script>
<link rel="stylesheet" href="/path/to/component.min.css">
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
Pj.component('.element', options);
```
---
## API


### Methods:
Methods are called on component instances through the component method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"getDataOptions"` | Make plugin themeable

**example:**
```javascript
Pj.$component('.element', getDataOptions)
Pj.$component('.element', getDataOptions, "foo")
Pj.$component('.element', getDataOptions, "foo", "bar")
```



---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/thecreaction/plugin.js/releases).

## Version
Version: 0.2.22

## Copyright and license
Copyright (C) 2017 Creation Studio Limited.

Licensed under [the GPL-v3 license](LICENSE).
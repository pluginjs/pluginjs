# ScrollEnd

[![npm package](https://img.shields.io/npm/v/@pluginjs/scroll-end.svg)](https://www.npmjs.com/package/@pluginjs/scroll-end)

A flexible modern scroll-end js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/scrollEnd/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/scroll-end
```

#### NPM

```javascript
npm i @pluginjs/scroll-end
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/scroll-end/dist/scroll-end.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-end/dist/scroll-end.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/scroll-end/dist/scroll-end.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-end/dist/scroll-end.min.css">
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
import ScrollEnd from "@pluginjs/scroll-end"
import "@pluginjs/scroll-end/dist/scroll-end.css"

ScrollEnd.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/scroll-end/dist/scroll-end.css")
const ScrollEnd = require("@pluginjs/scroll-end")

ScrollEnd.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-end/dist/scroll-end.css">
<script src="https://unpkg.com/@pluginjs/scroll-end/dist/scroll-end.js"></script>
<script>
  Pj.scrollEnd('.element', options)
</script>
```

---

## API

### Options

Options are called on scrollEnd instances through the scrollEnd options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"offset"` | Set offset | `{"top":0,"right":0,"bottom":0,"left":0}`
`"threshold"` | Set threshold | `0`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/scroll-end is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/scroll-end project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
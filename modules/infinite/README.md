# Infinite

[![npm package](https://img.shields.io/npm/v/@pluginjs/infinite.svg)](https://www.npmjs.com/package/@pluginjs/infinite)

A flexible modern infinite js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/infinite/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/infinite
```

#### NPM

```javascript
npm i @pluginjs/infinite
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/infinite/dist/infinite.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/infinite/dist/infinite.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/infinite/dist/infinite.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/infinite/dist/infinite.min.css">
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
import Infinite from "@pluginjs/infinite"
import "@pluginjs/infinite/dist/infinite.css"

Infinite.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/infinite/dist/infinite.css")
const Infinite = require("@pluginjs/infinite")

Infinite.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/infinite/dist/infinite.css">
<script src="https://unpkg.com/@pluginjs/infinite/dist/infinite.js"></script>
<script>
  Pj.infinite('.element', options)
</script>
```

---

## API

### Options

Options are called on infinite instances through the infinite options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"locale"` | Define multiple languages, value according to the constant configuration | `en`
`"templates"` | Template blocks | `{}`
`"threshold"` | Scroll to the bottom to load ahead of time, value must be a number | `0`
`"loadMore"` | Scroll to the bottom to load more callbacks | `function() {...}`

### Events

Events are called on infinite instances through the infinite events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"loading"` | Gets fired when plugin is loading
`"noMoreData"` | Gets fired when plugin is noMoreData
`"excepteError"` | Gets fired when plugin is excepteError

### Methods

Methods are called on infinite instances through the infinite method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-infinite`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"LOADER"` | Define the loader element | `{namespace}-loader`
`"LOADING"` | Define the loading status | `{namespace}-loading`
`"NOMOREDATA"` | Define the noMoreData status | `{namespace}-noMoreData`
`"EXCEPTION"` | Define the EXCEPTION status | `{namespace}-exception`

### Translations

Name | EN | ZH
-----|------|-------
`"loading"` | loading... | 加载中...
`"noMoreData"` | There are no more pages left to load. | 没有更多的页面可以加载.
`"exception"` | Except Error | 异常错误
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/infinite is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/infinite project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
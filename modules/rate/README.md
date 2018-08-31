# Rate

[![npm package](https://img.shields.io/npm/v/@pluginjs/rate.svg)](https://www.npmjs.com/package/@pluginjs/rate)

A flexible modern rate js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/rate/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/rate
```

#### NPM

```javascript
npm i @pluginjs/rate
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/rate/dist/rate.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/rate/dist/rate.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/rate/dist/rate.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/rate/dist/rate.min.css">
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
import Rate from "@pluginjs/rate"
import "@pluginjs/rate/dist/rate.css"

Rate.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/rate/dist/rate.css")
const Rate = require("@pluginjs/rate")

Rate.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/rate/dist/rate.css">
<script src="https://unpkg.com/@pluginjs/rate/dist/rate.js"></script>
<script>
  Pj.rate('.element', options)
</script>
```

---

## API

### Options

Options are called on rate instances through the rate options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"template"` | Set plugin default template | `function() {...}`
`"templates"` | Set plugin default template | `{}`
`"iconClass"` | Set icon class | `pj-icon pj-icon-star`
`"iconColorClass"` | Set icon color class | ``
`"min"` | Set min value | `2`
`"max"` | Set max value | `5`
`"value"` | Set default value | `0`
`"readonly"` | Set is read only or not | `false`
`"halfStar"` | Set is half start or not | `true`
`"step"` | Set step value | `0.5`
`"iconSize"` | Set icon size | ``
`"svg"` | Set svg | ``

### Events

Events are called on rate instances through the rate events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"changeHoverScore"` | Gets fired when hover score has be change
`"mouseLeave"` | Gets fired when mouse leave
`"changeScore"` | Get fired when score has be change
`"click"` | Get fired when plugin has be clicked

### Methods

Methods are called on rate instances through the rate method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin
`"getScore"` | Get current score
`"getHoverScore"` | Get current hover score
`"setScore"` | Set current score
`"clear"` | clean all score
`"readonly"` | Set plugin status to read only
`"setColor"` | Set color
`"resetIcon"` | Reset icon to default

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-rate`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"STAR"` | Declare star node | `{namespace}-star`
`"HALFSTAR"` | Declare half star node | `{namespace}-star-first`
`"FULlSTAR"` | Declare full star | `{namespace}-star-second`
`"HALFSTARACTIVE"` | Declare half star is active | `{namespace}-star-half`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"CLEARCOLOR"` | Announce color has be clear | `{namespace}-clear-color`
`"DEFAULTCOLOR"` | Announce default color | `{namespace}-default-color`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/rate is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/rate project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
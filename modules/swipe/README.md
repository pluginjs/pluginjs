# Swipe

[![npm package](https://img.shields.io/npm/v/@pluginjs/swipe.svg)](https://www.npmjs.com/package/@pluginjs/swipe)

A flexible modern swipe js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/swipe/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/swipe
```

#### NPM

```javascript
npm i @pluginjs/swipe
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/swipe/dist/swipe.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/swipe/dist/swipe.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/swipe/dist/swipe.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/swipe/dist/swipe.min.css">
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
import Swipe from "@pluginjs/swipe"
import "@pluginjs/swipe/dist/swipe.css"

Swipe.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/swipe/dist/swipe.css")
const Swipe = require("@pluginjs/swipe")

Swipe.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/swipe/dist/swipe.css">
<script src="https://unpkg.com/@pluginjs/swipe/dist/swipe.js"></script>
<script>
  Pj.swipe('.element', options)
</script>
```

---

## API

### Options

Options are called on swipe instances through the swipe options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"locale"` | Set locale | `en`
`"wrapperSelector"` | Wrapper selector | `null`
`"containerSelector"` | Container selector | `null`
`"itemSelector"` | Item selector | `div`
`"arrows"` | Active arrows | `false`
`"imgdot"` | Img dot | `false`
`"pagination"` | Active pagination | `false`
`"drag"` | Support drag | `true`
`"dragFree"` | Support dragfree | `false`
`"frictionFactor"` | friction factor | `0.8`
`"group"` | group | `false`
`"loop"` | Active loop mode | `false`
`"multiple"` | Active multiple mode | `false`
`"center"` | Set center model | `false`
`"itemNums"` | Number of swipe per column | `1`
`"gutter"` | '10px 10px' => 'top&amp;bottom left&amp;right', 10 => top&amp;bottom&amp;left&amp;right | `0`
`"height"` | Set swipe height | `100%`
`"advanced"` | Advance options | `{ getItemInstances: null, computeItemLocation: null, computeWidthResize: null }`
`"defaultActive"` | default index of active item | `0`
`"duration"` | Set duration | `400`
`"imgdotArr"` | Img dot list | `[]`
`"templates"` | HTML template engine | `{ wrapper, container, pagination }`

### Events

Events are called on swipe instances through the swipe events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin is update
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"change"` | Gets fired when plugin has change
`"next"` | Gets fired when plugin has next
`"prev"` | Gets fired when plugin has goes prev
`"dragStart"` | Gets fired when plugin has be dragStart
`"dragEnd"` | Gets fired when plugin has be dragEnd
`"moveEnd"` | Gets fired when plugin has be moveEnd
`"resize"` | Gets fired when plugin has be resize

### Methods

Methods are called on swipe instances through the swipe method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-swipe`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"WRAPPER"` | Declare wrapper node | `{namespace}-wrapper`
`"CONTAINER"` | Declare container node | `{namespace}-container`
`"ITEM"` | Declare item node | `{namespace}-item`
`"REPLICA"` | Declare replica node | `{namespace}-replica`
`"PAGINATION"` | Declare pagination node | `{namespace}-pagination`
`"PAGINATIONITEM"` | Declare pagination item node | `{namespace}-pagination-item`
`"ACTIVE"` | Declare active status | `{namespace}-active`
`"INFOS"` | Declare info | `{namespace}-infos`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/swipe is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/swipe project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
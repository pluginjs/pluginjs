# Paginator

[![npm package](https://img.shields.io/npm/v/@pluginjs/paginator.svg)](https://www.npmjs.com/package/@pluginjs/paginator)

A flexible modern paginator js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/paginator/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/paginator
```

#### NPM

```javascript
npm i @pluginjs/paginator
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/paginator/dist/paginator.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/paginator/dist/paginator.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/paginator/dist/paginator.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/paginator/dist/paginator.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Paginator from "@pluginjs/paginator"
import "@pluginjs/paginator/dist/paginator.css"

Paginator.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/paginator/dist/paginator.css")
const Paginator = require("@pluginjs/paginator")

Paginator.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/paginator/dist/paginator.css">
<script src="https://unpkg.com/@pluginjs/paginator/dist/paginator.js"></script>
<script>
  Pj.paginator('.element', options)
</script>
```

## API

### Options

Options are called on paginator instances through the paginator options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"totalItems"` | Set totalItem | `100`
`"currentPage"` | Set currentPage | `1`
`"itemsPerPage"` | Set itemsPerPage | `10`
`"layout"` | Set layout | `total, prev, list, next`
`"theme"` | Set plugin theme option | `null`
`"components"` | Set components | `{"first":{},"prev":{},"next":{},"last":{},"list":{},"jumper":{}}`
`"onInit"` | Set onInit | `null`
`"onReady"` | Set onReady | `null`
`"onChange"` | Set onChange | `null`

### Events

Events are called on paginator instances through the paginator events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"resize"` | Gets fired when plugin has resize
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on paginator instances through the paginator method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"first"` | Get value of first
`"last"` | Get value of last
`"next"` | Get value of next
`"prev"` | Get value of prev
`"goTo"` | Get value of goTo
`"update"` | Get value of update

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-paginator`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"LINK"` | Declare plugin link | `{namespace}-link`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"JUMPER"` | Declare plugin jumper | `{namespace}-jumper`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/paginator is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/paginator project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# Shorten

[![npm package](https://img.shields.io/npm/v/@pluginjs/shorten.svg)](https://www.npmjs.com/package/@pluginjs/shorten)

A flexible modern shorten js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/shorten/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/shorten
```

#### NPM

```javascript
npm i @pluginjs/shorten
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/shorten/dist/shorten.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/shorten/dist/shorten.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/shorten/dist/shorten.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/shorten/dist/shorten.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Shorten from "@pluginjs/shorten"
import "@pluginjs/shorten/dist/shorten.css"

Shorten.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/shorten/dist/shorten.css")
const Shorten = require("@pluginjs/shorten")

Shorten.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/shorten/dist/shorten.css">
<script src="https://unpkg.com/@pluginjs/shorten/dist/shorten.js"></script>
<script>
  Pj.shorten('.element', options)
</script>
```

## API

### Options

Options are called on shorten instances through the shorten options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"chars"` | Set chars | `100`
`"ellipses"` | Set ellipses text | `...`
`"more"` | Set more text | `more`
`"less"` | Set less text | `less`

### Events

Events are called on shorten instances through the shorten events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"expand"` | Gets fired when plugin is expand
`"collapse"` | Gets fired when plugin is collapse

### Methods

Methods are called on shorten instances through the shorten method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"collapse"` | Setup plugin into collapse status
`"expand"` | Setup plugin into expand status
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-shorten`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"EXPAND"` | Delcare plugin is at expend status | `{namespace}-expand`
`"DETAIL"` | Declare detail node | `{namespace}-detail`
`"ELLIPSES"` | Declare ellipses node | `{namespace}-ellipses`
`"TOGGLE"` | Declare toggle node | `{namespace}-toggle`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/shorten is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/shorten project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
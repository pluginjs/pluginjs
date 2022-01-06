# Collapse

[![npm package](https://img.shields.io/npm/v/@pluginjs/collapse.svg)](https://www.npmjs.com/package/@pluginjs/collapse)

A flexible modern collapse js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/collapse/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/collapse
```

#### NPM

```javascript
npm i @pluginjs/collapse
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/collapse/dist/collapse.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/collapse/dist/collapse.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/collapse/dist/collapse.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/collapse/dist/collapse.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Collapse from "@pluginjs/collapse"
import "@pluginjs/collapse/dist/collapse.css"

Collapse.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/collapse/dist/collapse.css")
const Collapse = require("@pluginjs/collapse")

Collapse.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/collapse/dist/collapse.css">
<script src="https://unpkg.com/@pluginjs/collapse/dist/collapse.js"></script>
<script>
  Pj.collapse('.element', options)
</script>
```

## API

### Options

Options are called on collapse instances through the collapse options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"instructions"` | Add plugin instructions option | `false`
`"collapsed"` | Set plugin is collapsed or not | `false`

### Events

Events are called on collapse instances through the collapse events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"expand"` | Gets fired when plugin is expand
`"expanded"` | Gets fired when plugin is expanded
`"collapse"` | Gets fired when plugin is collapse
`"collapsed"` | Gets fired when plugin is collapsed

### Methods

Methods are called on collapse instances through the collapse method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"toggle"` | Toggle plugin
`"collapse"` | Set collapse with plugin
`"expand"` | Set expand with plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-collapse`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"CONTAINER"` | Declare plugin range | `{namespace}`
`"COLLAPSED"` | Declare plugin collapsed | `{namespace}-collapsed`
`"COLLAPSING"` | Declare plugin is collapsing | `{namespace}-collapsing`
`"EXPANDED"` | Declare plugin is expanded | `{namespace}-expanded`
`"EXPANDING"` | Declare plugin is expanding | `{namespace}-expanding`
`"HEADER"` | Declare header element | `{namespace}-header`
`"CONTENT"` | Declare content node | `{namespace}-content`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/collapse is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/collapse project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
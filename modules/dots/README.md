# Dots

[![npm package](https://img.shields.io/npm/v/@pluginjs/dots.svg)](https://www.npmjs.com/package/@pluginjs/dots)

A flexible modern dots js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/dots/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/dots
```

#### NPM

```javascript
npm i @pluginjs/dots
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/dots/dist/dots.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dots/dist/dots.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/dots/dist/dots.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dots/dist/dots.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Dots from "@pluginjs/dots"
import "@pluginjs/dots/dist/dots.css"

Dots.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/dots/dist/dots.css")
const Dots = require("@pluginjs/dots")

Dots.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dots/dist/dots.css">
<script src="https://unpkg.com/@pluginjs/dots/dist/dots.js"></script>
<script>
  Pj.dots('.element', options)
</script>
```

## API

### Options

Options are called on dots instances through the dots options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"items"` | Add extend item with plugin | `null`
`"default"` | Set default status with plugin | `null`
`"vertical"` | Set vertical | `false`
`"valueFrom"` | pass attribute or tag name set where is value from | `["a","href"]`
`"template"` | Set dots default html template | `{}`

### Events

Events are called on dots instances through the dots events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"change"` | Gets fired when plugin is changed
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy
`"load"` | Gets fired when plugin is load
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hide
`"click"` | Gets fired when plugin is clicked

### Methods

Methods are called on dots instances through the dots method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"build"` | Build template
`"append"` | Append something
`"prepend"` | Append something behind of plugin
`"add"` | Add something
`"remove"` | Remove interface
`"empty"` | Set empty
`"load"` | Load something
`"get"` | Get value by key
`"set"` | Set value by key
`"show"` | Show plugin when it has be hided
`"hide"` | Hide plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-dot`
`"CONTAINER"` | Declare plugin range | `{namespace}s`
`"THEME"` | Declare plugin theme | `{namespace}s--{theme}`
`"ITEM"` | Declare item element of plugin | `{namespace}`
`"VERTICAL"` | Declare direction style | `{namespace}s-vertical`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"HIDDEN"` | Annouce plugin is hidden | `{namespace}-hidden`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/dots is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/dots project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
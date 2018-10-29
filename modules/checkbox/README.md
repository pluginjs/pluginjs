# Checkbox

[![npm package](https://img.shields.io/npm/v/@pluginjs/checkbox.svg)](https://www.npmjs.com/package/@pluginjs/checkbox)

A flexible modern checkbox js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/checkbox/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/checkbox
```

#### NPM

```javascript
npm i @pluginjs/checkbox
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/checkbox/dist/checkbox.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/checkbox/dist/checkbox.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/checkbox/dist/checkbox.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/checkbox/dist/checkbox.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Checkbox from "@pluginjs/checkbox"
import "@pluginjs/checkbox/dist/checkbox.css"

Checkbox.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/checkbox/dist/checkbox.css")
const Checkbox = require("@pluginjs/checkbox")

Checkbox.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/checkbox/dist/checkbox.css">
<script src="https://unpkg.com/@pluginjs/checkbox/dist/checkbox.js"></script>
<script>
  Pj.checkbox('.element', options)
</script>
```

## API

### Options

Options are called on checkbox instances through the checkbox options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"classes"` | Set classes | `{"button":"{namespace}-default"}`
`"disabled"` | Disabled plugin | `false`
`"getWrap"` | Get value of getWrap | `function() {...}`
`"getLabel"` | Get value of getlabel | `function() {...}`
`"getIcon"` | Get value of geticon | `function() {...}`
`"getGroup"` | Get value of getgroup | `function() {...}`
`"templates"` | Set default templates | `{}`

### Events

Events are called on checkbox instances through the checkbox events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"check"` | Gets fired when plugin has check
`"uncheck"` | Gets fired when plugin has uncheck

### Methods

Methods are called on checkbox instances through the checkbox method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"check"` | Set check
`"uncheck"` | Set uncheck

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-checkbox`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"ICON"` | Declare plugin icon | ``
`"CHECKED"` | Announce plugin is checked | `{namespace}-checked`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/checkbox is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/checkbox project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
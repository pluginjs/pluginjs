# Toggle

[![npm package](https://img.shields.io/npm/v/@pluginjs/toggle.svg)](https://www.npmjs.com/package/@pluginjs/toggle)

A flexible modern toggle js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/toggle/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/toggle
```

#### NPM

```javascript
npm i @pluginjs/toggle
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/toggle/dist/toggle.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toggle/dist/toggle.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/toggle/dist/toggle.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toggle/dist/toggle.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Toggle from "@pluginjs/toggle"
import "@pluginjs/toggle/dist/toggle.css"

Toggle.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/toggle/dist/toggle.css")
const Toggle = require("@pluginjs/toggle")

Toggle.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toggle/dist/toggle.css">
<script src="https://unpkg.com/@pluginjs/toggle/dist/toggle.js"></script>
<script>
  Pj.toggle('.element', options)
</script>
```

## API

### Options

Options are called on toggle instances through the toggle options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"dragable"` | Set plugin is dragable or not | `true`
`"clickable"` | Set plugin is clickable or not | `true`
`"disabled"` | Disable plugin | `false`
`"size"` | Set plugin size option | `null`
`"showText"` | Set plugin is showText or not | `false`
`"locale"` | Set locale environment | `en`
`"onText"` | Set plugin onText option | `null`
`"offText"` | Set plugin offText option | `null`
`"checked"` | Set plugin checked option | `null`
`"duration"` | Set duretion | `200`

### Events

Events are called on toggle instances through the toggle events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on toggle instances through the toggle method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"check"` | set check
`"uncheck"` | Set uncheck
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-toggle`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"SIZE"` | Declare plugin size | `{namespace}-{size}`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"ON"` | Declare plugin on | `{namespace}-on`
`"OFF"` | Declare plugin off | `{namespace}-off`
`"ISOFF"` | Declare plugin is off | `{namespace}-is-off`
`"HANDLE"` | Declare plugin handle | `{namespace}-handle`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

### Translations

Name | EN | ZH
--||-
`"on"` | ON | 开
`"off"` | OFF | 关

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/toggle is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/toggle project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
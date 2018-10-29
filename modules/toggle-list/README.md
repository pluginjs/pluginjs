# ToggleList

[![npm package](https://img.shields.io/npm/v/@pluginjs/toggle-list.svg)](https://www.npmjs.com/package/@pluginjs/toggle-list)

A flexible modern toggle-list js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/toggleList/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/toggle-list
```

#### NPM

```javascript
npm i @pluginjs/toggle-list
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/toggle-list/dist/toggle-list.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toggle-list/dist/toggle-list.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/toggle-list/dist/toggle-list.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toggle-list/dist/toggle-list.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ToggleList from "@pluginjs/toggle-list"
import "@pluginjs/toggle-list/dist/toggle-list.css"

ToggleList.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/toggle-list/dist/toggle-list.css")
const ToggleList = require("@pluginjs/toggle-list")

ToggleList.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toggle-list/dist/toggle-list.css">
<script src="https://unpkg.com/@pluginjs/toggle-list/dist/toggle-list.js"></script>
<script>
  Pj.toggleList('.element', options)
</script>
```

## API

### Options

Options are called on toggleList instances through the toggleList options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set the plugin is localeFallbacks or not | `true`
`"actions"` | Set plugin actions options | `[{"tagName":"input","trigger":"pj-toggleList-toggle","attrs":"checked=\"checked\"","event":"click","init":null}]`
`"format"` | Set format function | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`

### Events

Events are called on toggleList instances through the toggleList events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"check"` | Gets fired when plugin has check
`"uncheck"` | Gets fired when plugin has uncheck
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on toggleList instances through the toggleList method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"toggle"` | Set toggle

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-toggleList`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"SWITCH"` | Declare plugin switch | `{namespace}-toggle`
`"UNCHECKED"` | Declare plugin unchecked | `{namespace}-unchecked`
`"CHECKED"` | Declare plugin checked | `{namespace}-checked`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/toggle-list is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/toggle-list project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
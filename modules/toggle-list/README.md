# ToggleList

[![npm package](https://img.shields.io/npm/v/@pluginjs/toggle-list.svg)](https://www.npmjs.com/package/@pluginjs/toggle-list)

A flexible modern toggle-list js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/toggleList/samples)**

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

---

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
<body>
  <div class="element"></div>
</body>
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

---

## API

### Options

Options are called on toggleList instances through the toggleList options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
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
-----|-----
`"ready"` | Gets fired when plugin has ready
`"check"` | Gets fired when plugin has check
`"uncheck"` | Gets fired when plugin has uncheck
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on toggleList instances through the toggleList method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"toggle"` | Set toggle

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-toggleList`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"SWITCH"` | Declare plugin switch | `{namespace}-toggle`
`"UNCHECKED"` | Declare plugin unchecked | `{namespace}-unchecked`
`"CHECKED"` | Declare plugin checked | `{namespace}-checked`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/toggle-list is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/toggle-list project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
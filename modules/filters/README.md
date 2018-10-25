# Filters

[![npm package](https://img.shields.io/npm/v/@pluginjs/filters.svg)](https://www.npmjs.com/package/@pluginjs/filters)

A flexible modern filters js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/filters/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/filters
```

#### NPM

```javascript
npm i @pluginjs/filters
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/filters/dist/filters.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/filters/dist/filters.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/filters/dist/filters.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/filters/dist/filters.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Filters from "@pluginjs/filters"
import "@pluginjs/filters/dist/filters.css"

Filters.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/filters/dist/filters.css")
const Filters = require("@pluginjs/filters")

Filters.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/filters/dist/filters.css">
<script src="https://unpkg.com/@pluginjs/filters/dist/filters.js"></script>
<script>
  Pj.filters('.element', options)
</script>
```

## API

### Options

Options are called on filters instances through the filters options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"items"` | Set items with plugin | `null`
`"default"` | Set default with filters | `null`
`"valueFrom"` | Set value from | `data-id`
`"template"` | Set plugin default template | `{}`

### Events

Events are called on filters instances through the filters events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"change"` | Gets fired when plugin is changed
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on filters instances through the filters method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"build"` | Build plugin template
`"append"` | Append data to plugin
`"get"` | Get value by key
`"set"` | Set value by key

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-filter`
`"CONTAINER"` | Declare plugin range | `{namespace}s`
`"THEME"` | Declare plugin theme | `{namespace}s--{theme}`
`"ITEM"` | Declare plugin item | `{namespace}`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/filters is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/filters project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# Units

[![npm package](https://img.shields.io/npm/v/@pluginjs/units.svg)](https://www.npmjs.com/package/@pluginjs/units)

A flexible modern units js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/units/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/units
```

#### NPM

```javascript
npm i @pluginjs/units
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/units/dist/units.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/units/dist/units.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/units/dist/units.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/units/dist/units.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Units from "@pluginjs/units"
import "@pluginjs/units/dist/units.css"

Units.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/units/dist/units.css")
const Units = require("@pluginjs/units")

Units.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/units/dist/units.css">
<script src="https://unpkg.com/@pluginjs/units/dist/units.js"></script>
<script>
  Pj.units('.element', options)
</script>
```

## API

### Options

Options are called on units instances through the units options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"disabled"` | Disabled plugin | `false`
`"width"` | Set plugin width | `null`
`"data"` | Set plugin data option | `null`
`"placement"` | Set placement value | `bottom-right`
`"defaultUnit"` | Set plugin defaultUnit option | `null`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"onChange"` | The onchange event occurs when the content of the domain changes | `function() {...}`
`"onSubmit"` | submit data | `function() {...}`

### Events

Events are called on units instances through the units events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"submit"` | Gets fired when plugin has submit
`"setunit"` | Gets fired when plugin has setunit
`"changeVal"` | Gets fired when plugin has changeVal

### Methods

Methods are called on units instances through the units method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"get"` | Get value by key
`"getUnit"` | Get value of unit
`"getInput"` | Get value of input
`"val"` | Set or get value by key
`"set"` | Set value by key
`"toggleUnit"` | Set value of input

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-units`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"TRIGGER"` | Declare plugin trigger | `{namespace}-trigger`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"ONLY"` | Declare plugin only | `{namespace}-only`
`"INPUT"` | Declare plugin input | `{namespace}-input`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/units is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/units project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
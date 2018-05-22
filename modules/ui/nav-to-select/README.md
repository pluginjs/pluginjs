# NavToSelect
> A flexible modern nav-to-select js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/nav-to-select
```
#### NPM
```javascript
npm i @pluginjs/nav-to-select
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import navToSelect from "@pluginjs/nav-to-select"
```

CommonJS
```javascript
require("@pluginjs/nav-to-select")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/nav-to-select.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/nav-to-select.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/nav-to-select.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/nav-to-select.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
JS:
```javascript
Pj.navToSelect('.element', options);
```
---
## API

### Options:
Options are called on navToSelect instances through the navToSelect options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"maxLevel"` | Set max of plugin level | `4`
`"prependTo"` | Set prepento | `null`
`"activeClass"` | Set active class | `active`
`"linkSelector"` | Set link selector | `a:first`
`"indentString"` | Set indent string | `&amp;ndash;`
`"indentSpace"` | Set enable indent space or not | `true`
`"placeholder"` | Set placeholder value | `Navigate to...`
`"useOptgroup"` | Set enable use opt group or not | `false`
`"itemFilter"` | Set item filter callback | `function() {...}`
`"getItemLabel"` | Set get item label callback | `function() {...}`
`"getItemsFromList"` | Set get items from list callback | `function() {...}`
`"onChange"` | Set change event callback | `function() {...}`

### Events:
Events are called on navToSelect instances through the navToSelect events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

```
### Methods:
Methods are called on navToSelect instances through the navToSelect method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"getItemValue"` | Get item value of plugin
`"isLinkable"` | Get if linkable or not
`"isActived"` | Get is Actived
`"isBuilded"` | Get has builded or not
`"getSelect"` | Get select value

**example:**
```javascript
Pj.$navToSelect('.element', enable)
Pj.$navToSelect('.element', enable, "foo")
Pj.$navToSelect('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-navToSelect`
`"SELECT"` | Declare plugin select | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`



---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/plugin/plugin.js/releases).

## Version
Version: 0.2.18

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
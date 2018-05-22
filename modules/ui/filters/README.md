# Filters
> A flexible modern filters js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/filters
```
#### NPM
```javascript
npm i @pluginjs/filters
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import filters from "@pluginjs/filters"
```

CommonJS
```javascript
require("@pluginjs/filters")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/filters.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/filters.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/filters.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/filters.min.css">
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
Pj.filters('.element', options);
```
---
## API

### Options:
Options are called on filters instances through the filters options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"items"` | Set items with plugin | `null`
`"default"` | Set default with filters | `null`
`"valueFrom"` | Set value from | `data-id`
`"template"` | Set plugin default template | `{}`

### Events:
Events are called on filters instances through the filters events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"change"` | Gets fired when plugin is changed
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

```
### Methods:
Methods are called on filters instances through the filters method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"build"` | Build plugin template
`"append"` | Append data to plugin
`"get"` | Get value by key
`"set"` | Set value by key

**example:**
```javascript
Pj.$filters('.element', enable)
Pj.$filters('.element', enable, "foo")
Pj.$filters('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-filter`
`"CONTAINER"` | Declare plugin range | `{namespace}s`
`"THEME"` | Declare plugin theme | `{namespace}s--{theme}`
`"ITEM"` | Declare plugin item | `{namespace}`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`



### Dependencies:
- `[object Object]`

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
Version: 0.2.19

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
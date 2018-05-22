# TableSort
> A flexible modern table-sort js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/table-sort
```
#### NPM
```javascript
npm i @pluginjs/table-sort
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import tableSort from "@pluginjs/table-sort"
```

CommonJS
```javascript
require("@pluginjs/table-sort")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/table-sort.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/table-sort.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/table-sort.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/table-sort.min.css">
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
Pj.tableSort('.element', options);
```
---
## API

### Options:
Options are called on tableSort instances through the tableSort options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"icons"` | Set table icon | `{&quot;sort&quot;:&quot;icon-sort&quot;,&quot;asc&quot;:&quot;icon-sort-ascending&quot;,&quot;desc&quot;:&quot;icon-sort-descending&quot;}`

### Events:
Events are called on tableSort instances through the tableSort events itself.
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
Methods are called on tableSort instances through the tableSort method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"init"` | Initial plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"append"` | Append data to table
`"replace"` | Replace data to table
`"sort"` | Sort data to table

**example:**
```javascript
Pj.$tableSort('.element', init)
Pj.$tableSort('.element', init, "foo")
Pj.$tableSort('.element', init, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-tableSort`



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
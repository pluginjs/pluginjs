# TableSort

[![npm package](https://img.shields.io/npm/v/@pluginjs/table-sort.svg)](https://www.npmjs.com/package/@pluginjs/table-sort)

A flexible modern table-sort js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/tableSort/samples)**

## Introduction

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

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.min.css">
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
import TableSort from "@pluginjs/table-sort"
import "@pluginjs/table-sort/dist/table-sort.css"

TableSort.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/table-sort/dist/table-sort.css")
const TableSort = require("@pluginjs/table-sort")

TableSort.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.css">
  <script async src="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.js"></script>
</head>
```

```javascript
Pj.tableSort('.element', options);
```

---

## API

### Options

Options are called on tableSort instances through the tableSort options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"icons"` | Set table icon | `{&quot;sort&quot;:&quot;icon-sort&quot;,&quot;asc&quot;:&quot;icon-sort-ascending&quot;,&quot;desc&quot;:&quot;icon-sort-descending&quot;}`

### Events

Events are called on tableSort instances through the tableSort events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

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

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-tableSort`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/table-sort is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/table-sort project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
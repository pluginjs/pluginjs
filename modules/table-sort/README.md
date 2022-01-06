# TableSort

[![npm package](https://img.shields.io/npm/v/@pluginjs/table-sort.svg)](https://www.npmjs.com/package/@pluginjs/table-sort)

A flexible modern table-sort js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/tableSort/samples)**

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
<div class="element"></div>
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
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.css">
<script src="https://unpkg.com/@pluginjs/table-sort/dist/table-sort.js"></script>
<script>
  Pj.tableSort('.element', options)
</script>
```

## API

### Options

Options are called on tableSort instances through the tableSort options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"icons"` | Set table icon | `{"sort":"pj-icon pj-icon-sort","asc":"pj-icon pj-icon-sort-ascending","desc":"pj-icon pj-icon-sort-descending"}`

### Events

Events are called on tableSort instances through the tableSort events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on tableSort instances through the tableSort method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"init"` | Initial plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"append"` | Append data to table
`"replace"` | Replace data to table
`"sort"` | Sort data to table

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-tableSort`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/table-sort is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/table-sort project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
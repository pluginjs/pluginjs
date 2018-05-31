# Tree
> A flexible modern tree js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/tree
```
#### NPM
```javascript
npm i @pluginjs/tree
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import tree from "@pluginjs/tree"
```

CommonJS
```javascript
require("@pluginjs/tree")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/tree.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/tree.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/tree.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/tree.min.css">
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
Pj.tree('.element', options);
```
---
## API

### Options:
Options are called on tree instances through the tree options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"autoOpen"` | Set autoOpenSet aytoOpenSet | `[1,2]`
`"keyboard"` | Set keyboard | `true`
`"dataFromHtml"` | Set dataFromHtml | `false`
`"data"` | Set data | `null`
`"multiSelect"` | Set multiSelect | `false`
`"canUnselect"` | Set canUnselect | `true`
`"tabindex"` | Set tabindex | `0`
`"templates"` | Set default templates | `{}`

### Events:
Events are called on tree instances through the tree events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"close"` | Gets fired when plugin has close
`"open"` | Gets fired when plugin has open
`"select"` | Gets fired when plugin has select
`"unselect"` | Gets fired when plugin has unselect

```
### Methods:
Methods are called on tree instances through the tree method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"open"` | Set value of open
`"close"` | close element
`"before"` | Set value of before element
`"after"` | Set value of after element
`"append"` | Set value of append element
`"prepend"` | Set value of prepend element
`"remove"` | Set value of prepend remove
`"getRoot"` | Set value of prepend getRoot
`"getSelected"` | Set value of getSelected
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$tree('.element', open)
Pj.$tree('.element', open, "foo")
Pj.$tree('.element', open, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-tree`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"TREE"` | Declare plugin tree | `{namespace}`
`"TOGGLER"` | Declare plugin toggle | `{namespace}-toggler`
`"BRANCH"` | Declare plugin branch | `{namespace}-branch`
`"OPEN"` | Declare plugin open | `{namespace}-open`
`"SELECTED"` | Declare plugin selected | `{namespace}-selected`
`"CHILDRENSELECTED"` |  | `{namespace}-childrenSelected`



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
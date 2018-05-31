# Paginator
> A flexible modern paginator js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/paginator
```
#### NPM
```javascript
npm i @pluginjs/paginator
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import paginator from "@pluginjs/paginator"
```

CommonJS
```javascript
require("@pluginjs/paginator")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/paginator.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/paginator.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/paginator.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/paginator.min.css">
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
Pj.paginator('.element', options);
```
---
## API

### Options:
Options are called on paginator instances through the paginator options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"totalItems"` | Set totalItem | `100`
`"currentPage"` | Set currentPage | `1`
`"itemsPerPage"` | Set itemsPerPage | `10`
`"layout"` | Set layout | `total, prev, list, next`
`"theme"` | Set plugin theme option | `null`
`"components"` | Set components | `{&quot;first&quot;:{},&quot;prev&quot;:{},&quot;next&quot;:{},&quot;last&quot;:{},&quot;list&quot;:{},&quot;jumper&quot;:{}}`
`"onInit"` | Set onInit | `null`
`"onReady"` | Set onReady | `null`
`"onChange"` | Set onChange | `null`

### Events:
Events are called on paginator instances through the paginator events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"resize"` | Gets fired when plugin has resize
`"change"` | Gets fired when plugin has changed

```
### Methods:
Methods are called on paginator instances through the paginator method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"first"` | Get value of first
`"last"` | Get value of last
`"next"` | Get value of next
`"prev"` | Get value of prev
`"goTo"` | Get value of goTo
`"update"` | Get value of update

**example:**
```javascript
Pj.$paginator('.element', enable)
Pj.$paginator('.element', enable, "foo")
Pj.$paginator('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-paginator`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"LINK"` | Declare plugin link | `{namespace}-link`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"JUMPER"` | Declare plugin jumper | `{namespace}-jumper`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`



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
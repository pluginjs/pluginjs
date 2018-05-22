# Offset
> A flexible modern offset js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/offset
```
#### NPM
```javascript
npm i @pluginjs/offset
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import offset from "@pluginjs/offset"
```

CommonJS
```javascript
require("@pluginjs/offset")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/offset.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/offset.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/offset.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/offset.min.css">
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
Pj.offset('.element', options);
```
---
## API

### Options:
Options are called on offset instances through the offset options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"locale"` | Set locale environment | `en`
`"template"` | Set default template | `function() {...}`
`"defaultUnit"` | Set defaultUnit | `px`
`"data"` | Set data | `null`
`"min"` | Set min | `-1000`
`"max"` | Set max | `1000`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events:
Events are called on offset instances through the offset events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

```
### Methods:
Methods are called on offset instances through the offset method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"move"` | Get value of move
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"clear"` | Clear plugin

**example:**
```javascript
Pj.$offset('.element', get)
Pj.$offset('.element', get, "foo")
Pj.$offset('.element', get, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-offset`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"INNER"` | Declare plugin inner | `{namespace}-inner`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"MARGINTOP"` | Declare plugin marginTop | `{namespace}-marginTop`
`"MARGINBOTTOM"` | Declare plugin marginBottom | `{namespace}-marginBottom`
`"MARGINLEFT"` | Declare plugin marginLeft | `{namespace}-marginLeft`
`"MARGINRIGHT"` | Declare plugin marginRight | `{namespace}-marginRight`
`"PADDINGTOP"` | Declare plugin paddingTop | `{namespace}-paddingTop`
`"PADDINGBOTTOM"` | Declare plugin paddingBottom | `{namespace}-paddingBottom`
`"PADDINGLEFT"` | Declare plugin paddingLeft | `{namespace}-paddingLeft`
`"PADDINGRIGHT"` | Declare plugin paddingLeft | `{namespace}-paddingRight`
`"VIEW"` | Declare plugin view | `{namespace}-view`
`"UNITSHOW"` | Declare plugin unit show | `{namespace}-unit-show`
`"CONNECT"` | Declare plugin connect | `{namespace}-connect`
`"CONNECTLINK"` | Declare plugin connect link | `{namespace}-connect-link`
`"CONNECTUNLINK"` | Declare plugin connect unlink | `{namespace}-connect-unlink`
`"CONNECTACTIVE"` | Declare plugin connect active | `{namespace}-connect-active`


### Translations:
Name | EN | ZH
-----|------|-------
`"brokenLink"` | Broken Link | 解开链接
`"keepLink"` | Keep Them Constant | 保持链接


### Dependencies:
- `[object Object]`
- `[object Object]`
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
Version: 0.2.20

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
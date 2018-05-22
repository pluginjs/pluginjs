# Shorten
> A flexible modern shorten js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/shorten
```
#### NPM
```javascript
npm i @pluginjs/shorten
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import shorten from "@pluginjs/shorten"
```

CommonJS
```javascript
require("@pluginjs/shorten")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/shorten.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/shorten.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/shorten.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/shorten.min.css">
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
Pj.shorten('.element', options);
```
---
## API

### Options:
Options are called on shorten instances through the shorten options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"chars"` | Set chars | `100`
`"ellipses"` | Set ellipses text | `...`
`"more"` | Set more text | `more`
`"less"` | Set less text | `less`

### Events:
Events are called on shorten instances through the shorten events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"expand"` | Gets fired when plugin is expand
`"collapse"` | Gets fired when plugin is collapse

```
### Methods:
Methods are called on shorten instances through the shorten method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"collapse"` | Setup plugin into collapse status
`"expand"` | Setup plugin into expand status
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$shorten('.element', collapse)
Pj.$shorten('.element', collapse, "foo")
Pj.$shorten('.element', collapse, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-shorten`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"EXPAND"` | Delcare plugin is at expend status | `{namespace}-expand`
`"DETAIL"` | Declare detail node | `{namespace}-detail`
`"ELLIPSES"` | Declare ellipses node | `{namespace}-ellipses`
`"TOGGLE"` | Declare toggle node | `{namespace}-toggle`



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
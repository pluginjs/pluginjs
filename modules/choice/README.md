# Choice
> A flexible modern choice js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/choice
```
#### NPM
```javascript
npm i @pluginjs/choice
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import choice from "@pluginjs/choice"
```

CommonJS
```javascript
require("@pluginjs/choice")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/choice.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/choice.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/choice.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/choice.min.css">
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
Pj.choice('.element', options);
```
---
## API

### Options:
Options are called on choice instances through the choice options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"multiple"` | Set multiple | `false`
`"value"` | Set vakue | ``
`"overflow"` | Set overflow | `false`
`"disabled"` | Disabled plugin | `false`
`"toggleTrigger"` | Set toggleTrigger | `hover`
`"toggleIcon"` | Set toggleIcon | `fa fa-caret-down`
`"templates"` | Set default templates | `{}`

### Events:
Events are called on choice instances through the choice events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"select"` | Gets fired when plugin has select
`"unselect"` | Gets fired when plugin has unselect

```
### Methods:
Methods are called on choice instances through the choice method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"select"` | Set value of select
`"unselect"` | Set value of unselect
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key

**example:**
```javascript
Pj.$choice('.element', enable)
Pj.$choice('.element', enable, "foo")
Pj.$choice('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-choice`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"DROPDOWN"` |  | `{namespace}-dropdown`
`"DROPDOWNSHOW"` | Declare plugin dropdown show | `{namespace}-dropdown-show`
`"TOGGLE"` | Declare plugin toggle | `{namespace}-toggle`
`"SELECTED"` | Declare plugin selected | `{namespace}-selected`
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
Version: 0.2.22

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
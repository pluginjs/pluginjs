# Spinner
> A flexible modern spinner js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/spinner
```
#### NPM
```javascript
npm i @pluginjs/spinner
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import spinner from "@pluginjs/spinner"
```

CommonJS
```javascript
require("@pluginjs/spinner")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/spinner.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/spinner.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/spinner.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/spinner.min.css">
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
Pj.spinner('.element', options);
```
---
## API

### Options:
Options are called on spinner instances through the spinner options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"disabled"` | Disabled plugin | `false`
`"min"` | Set plugin min option | `0`
`"max"` | Set plugin max option | `100`
`"step"` | Set plugin step option | `1`
`"name"` | Set plugin name option | `null`
`"precision"` | Set plugin precision option | `0`
`"rule"` | Set plugin rule option | `null`
`"unit"` | Set plugin unit option | `null`
`"layout"` | Set plugin layout option | `both`
`"looping"` | Set plugin looping option | `true`
`"mousewheel"` | Set plugin mousewheel option | `false`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events:
Events are called on spinner instances through the spinner events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

```
### Methods:
Methods are called on spinner instances through the spinner method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"update"` | Update plugin
`"spinDown"` | Get value of subtraction
`"spinUp"` | Get value of add

**example:**
```javascript
Pj.$spinner('.element', get)
Pj.$spinner('.element', get, "foo")
Pj.$spinner('.element', get, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-spinner`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"FOCUS"` | Declare plugin focus | `{namespace}-focus`
`"CONTROL"` | Declare plugin control | `{namespace}-control`
`"DOWN"` | Declare plugin down | `{namespace}-down`
`"UP"` | Declare plugin up | `{namespace}-up`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"CONTROLRIGHT"` | Declare plugin control right | `{namespace}-control-right`



### Dependencies:
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
Version: 0.2.19

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
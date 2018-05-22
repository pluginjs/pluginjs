# TimePicker
> A flexible modern time-picker js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/time-picker
```
#### NPM
```javascript
npm i @pluginjs/time-picker
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import timePicker from "@pluginjs/time-picker"
```

CommonJS
```javascript
require("@pluginjs/time-picker")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/time-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/time-picker.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/time-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/time-picker.min.css">
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
Pj.timePicker('.element', options);
```
---
## API

### Options:
Options are called on timePicker instances through the timePicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"value"` | sET VALUE | `null`
`"name"` | set name | `time-picker`
`"use24HourFormat"` | Set use24HourFormat | `true`
`"placeholder"` | Set input box prompt information | `Select Time`
`"keyboard"` | Set keyboard | `true`
`"disabled"` | Set disabled | `false`
`"maxTime"` | Set maxTime | ``
`"minTime"` | Set minTime | ``
`"step"` | Set step | `30`

### Events:
Events are called on timePicker instances through the timePicker events itself.
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
Methods are called on timePicker instances through the timePicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"get"` | Get value by key
`"val"` | Set or get value by key
`"set"` | Set value by key
`"timeLimit"` | Set value of timeLimit
`"observeOtherTimePicker"` | Set value of observeOtherTimePicker

**example:**
```javascript
Pj.$timePicker('.element', enable)
Pj.$timePicker('.element', enable, "foo")
Pj.$timePicker('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-timePicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"DROPDOWN"` | Declare plugin dropdown | `{namespace}-dropdown`



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
Version: 0.2.20

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
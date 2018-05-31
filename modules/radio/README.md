# Radio
> A flexible modern radio js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/radio
```
#### NPM
```javascript
npm i @pluginjs/radio
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import radio from "@pluginjs/radio"
```

CommonJS
```javascript
require("@pluginjs/radio")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/radio.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/radio.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/radio.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/radio.min.css">
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
Pj.radio('.element', options);
```
---
## API

### Options:
Options are called on radio instances through the radio options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"classes"` | Set the button class name  | `{&quot;button&quot;:&quot;{namespace}-default&quot;}`
`"disabled"` | Disabled plugin | `false`
`"getWrap"` | Get the parent element of each element | `function() {...}`
`"getLabel"` | Get the adjacent element of each element | `function() {...}`
`"getIcon"` | Get the descendants of each element | `function() {...}`
`"getGroup"` | Set the value of the input attribute | `function() {...}`
`"templates"` | Set default templates | `{}`

### Events:
Events are called on radio instances through the radio events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"check"` | Gets fired when plugin has check
`"uncheck"` | Gets fired when plugin has uncheck

```
### Methods:
Methods are called on radio instances through the radio method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"check"` | Set check
`"uncheck"` | Set uncheck

**example:**
```javascript
Pj.$radio('.element', enable)
Pj.$radio('.element', enable, "foo")
Pj.$radio('.element', enable, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-radio`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"ICON"` | Declare plugin icon | ``
`"CHECKED"` | Declare plugin checked | `{namespace}-checked`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disable`



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
Version: 0.2.21

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
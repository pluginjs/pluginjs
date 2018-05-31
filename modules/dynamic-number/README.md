# DynamicNumber
> A flexible modern dynamic-number js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/dynamic-number
```
#### NPM
```javascript
npm i @pluginjs/dynamic-number
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import dynamicNumber from "@pluginjs/dynamic-number"
```

CommonJS
```javascript
require("@pluginjs/dynamic-number")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/dynamic-number.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/dynamic-number.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/dynamic-number.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/dynamic-number.min.css">
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
Pj.dynamicNumber('.element', options);
```
---
## API

### Options:
Options are called on dynamicNumber instances through the dynamicNumber options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"from"` | Set smallest number | `0`
`"to"` | Set the largest number | `100`
`"duration"` | Set duration | `1000`
`"decimals"` | Set decimals value | `0`
`"format"` | Set format callback | `function() {...}`
`"percentage"` | Set percentage config | `{&quot;decimals&quot;:0}`
`"currency"` | Set currency config | `{&quot;indicator&quot;:&quot;$&quot;,&quot;size&quot;:3,&quot;decimals&quot;:&quot;2&quot;,&quot;separator&quot;:&quot;,&quot;,&quot;decimalsPoint&quot;:&quot;.&quot;}`
`"group"` | Set group config | `{&quot;size&quot;:3,&quot;decimals&quot;:&quot;2&quot;,&quot;separator&quot;:&quot;,&quot;,&quot;decimalsPoint&quot;:&quot;.&quot;}`

### Events:
Events are called on dynamicNumber instances through the dynamicNumber events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"start"` | Gets fired when plugin is started
`"stop"` | Gets fired when plugin is stop
`"finish"` | Gets fired when plugin is finish
`"reset"` | Gets fired when plugin has be reset
`"destroy"` | Gets fired when plugin is destroy

```
### Methods:
Methods are called on dynamicNumber instances through the dynamicNumber method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"start"` | Start plugin
`"stop"` | Stop plugin
`"finish"` | Finish plugin
`"reset"` | Reset plugin
`"destroy"` | Destroy plugin
`"go"` | 

**example:**
```javascript
Pj.$dynamicNumber('.element', start)
Pj.$dynamicNumber('.element', start, "foo")
Pj.$dynamicNumber('.element', start, "foo", "bar")
```



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
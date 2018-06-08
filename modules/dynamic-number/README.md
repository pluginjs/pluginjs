# DynamicNumber

[![npm package](https://img.shields.io/npm/v/@pluginjs/dynamic-number.svg)](https://www.npmjs.com/package/@pluginjs/dynamic-number)

A flexible modern dynamic-number js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/dynamicNumber/samples)**

## Introduction

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

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.min.css">
```

### Initialize

HTML:

```html
<body>
  <div class="element"></div>
</body>
```

ECMAScript Module:

```javascript
import DynamicNumber from "@pluginjs/dynamic-number"
import "@pluginjs/dynamic-number/dist/dynamic-number.css"

DynamicNumber.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/dynamic-number/dist/dynamic-number.css")
const DynamicNumber = require("@pluginjs/dynamic-number")

DynamicNumber.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.css">
  <script async src="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.js"></script>
</head>
```

```javascript
Pj.dynamicNumber('.element', options);
```

---

## API

### Options

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

### Events

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

### Methods

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
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/dynamic-number is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/dynamic-number project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
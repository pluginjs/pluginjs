# DynamicNumber

[![npm package](https://img.shields.io/npm/v/@pluginjs/dynamic-number.svg)](https://www.npmjs.com/package/@pluginjs/dynamic-number)

A flexible modern dynamic-number js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/dynamicNumber/samples)**

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
<div class="element"></div>
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
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.css">
<script src="https://unpkg.com/@pluginjs/dynamic-number/dist/dynamic-number.js"></script>
<script>
  Pj.dynamicNumber('.element', options)
</script>
```

## API

### Options

Options are called on dynamicNumber instances through the dynamicNumber options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"from"` | Set smallest number | `0`
`"to"` | Set the largest number | `100`
`"duration"` | Set duration | `1000`
`"decimals"` | Set decimals value | `0`
`"format"` | Set format callback | `function() {...}`
`"percentage"` | Set percentage config | `{"decimals":0}`
`"currency"` | Set currency config | `{"indicator":"$","size":3,"decimals":"2","separator":",","decimalsPoint":"."}`
`"group"` | Set group config | `{"size":3,"decimals":"2","separator":",","decimalsPoint":"."}`

### Events

Events are called on dynamicNumber instances through the dynamicNumber events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
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
--|--
`"start"` | Start plugin
`"stop"` | Stop plugin
`"finish"` | Finish plugin
`"reset"` | Reset plugin
`"destroy"` | Destroy plugin
`"go"` | Move the number to the specified value

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/dynamic-number is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/dynamic-number project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
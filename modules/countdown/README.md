# Countdown

[![npm package](https://img.shields.io/npm/v/@pluginjs/countdown.svg)](https://www.npmjs.com/package/@pluginjs/countdown)

A flexible modern countdown js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/countdown/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/countdown
```

#### NPM

```javascript
npm i @pluginjs/countdown
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/countdown/dist/countdown.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/countdown/dist/countdown.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjscountdown/dist/countdown.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/countdown/dist/countdown.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import CountDown from "@pluginjs/countdown"
import "@pluginjs/countdown/dist/countdown.css"

CountDown.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/countdown/dist/countdown.css")
const countdown = require("@pluginjs/countdown")

CountDown.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/countdown/dist/countdown.css">
<script src="https://unpkg.com/@pluginjs/countdown/dist/countdown.js"></script>
<script>
  Pj.countdown('.element', options)
</script>
```

## API

### Options

Options are called on countdown instances through the countdown options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"mode"` | Add plugin mode option | `ordinary`
`"modes"` | Set modes | `{"ordinary":{},"flip":{},"progress":{size: 100,barcolor:'#ccc',barsize:4,trackcolor:'#55a4f2'}}`
`"format"` | Add plugin format option | `d,h,m,s`
`"label"` | Set label value | `true`
`"site"` | Set label site | `under`
`"due"` | Set due time | `2018-12-28 19:32:28`
`"now"` | Set now time | `new Date()`
`"templates"` | Set default templates | `{}`

### Events
Events are called on countdown instances through the countdown events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enable
`"disable"` | Gets fired when plugin is disable
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on coundown instances through the coundown method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"start"` | Start plugin
`"stop"` | Stop plugin

### Classes
Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-countdown`
`"DISABLED"` | Declare plugin is disabled | `{namespace}-disabled`
`"MODE"` | Declare plugin is mode | `{namespace}-{mode}`
`"TIME"` | Declare plugin is time | `${namespace}-time`
`"NUMBER"` | Declare plugin is number | `${namespace}-number`
`"LABEL"` | Declare plugin is label | `${namespace}-label`

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/countdown is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/countdown project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
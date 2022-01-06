# Progress

[![npm package](https://img.shields.io/npm/v/@pluginjs/progress.svg)](https://www.npmjs.com/package/@pluginjs/progress)

A flexible modern progress js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/progress/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/progress
```

#### NPM

```javascript
npm i @pluginjs/progress
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/progress/dist/progress.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/progress/dist/progress.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/progress/dist/progress.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/progress/dist/progress.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Progress from "@pluginjs/progress"
import "@pluginjs/progress/dist/progress.css"

Progress.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/progress/dist/progress.css")
const Progress = require("@pluginjs/progress")

Progress.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/progress/dist/progress.css">
<script src="https://unpkg.com/@pluginjs/progress/dist/progress.js"></script>
<script>
  Pj.progress('.element', options)
</script>
```

## API

### Options

Options are called on progress instances through the progress options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"bootstrap"` | Enable bootstrap or not | `false`
`"min"` | Set min value | `0`
`"max"` | Set max value | `100`
`"goal"` | Set goal value | `100`
`"speed"` | Set speed from 1 to 100 | `20`
`"easing"` | Set easing for plugin | `ease`
`"direction"` | Set direction for plugin | `horizontal`
`"templates"` | Set templates for plugin | `{}`
`"valueCallback"` | Set value callback for plugin | `function() {...}`

### Events

Events are called on progress instances through the progress events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"finish"` | Gets fired when plugin is finish
`"stop"` | Gets fired when plugin is stop
`"reset"` | Gets fired when plugin is reset
`"start"` | Gets fired when plugin is start
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled

### Methods

Methods are called on progress instances through the progress method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"get"` | Get value by key
`"start"` | Start plugin
`"stop"` | Stop plugin
`"finish"` | Finish plugin
`"reset"` | Reset plugin
`"go"` | Go to something progress
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-progress`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"ELEMENT"` | Declare plugin element | `{namespace}`
`"LABEL"` | Declare plugin label | `{namespace}-label`
`"VALUE"` | Declare plugin value | `{namespace}-value`
`"BAR"` | Declare plugin bar | `{namespace}-bar`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"VERTICAL"` | Declare plugin direction is vertical | `{namespace}-vertical`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/progress is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/progress project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
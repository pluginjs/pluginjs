# Tooltip

[![npm package](https://img.shields.io/npm/v/@pluginjs/tooltip.svg)](https://www.npmjs.com/package/@pluginjs/tooltip)

A flexible modern tooltip js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/tooltip/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/tooltip
```

#### NPM

```javascript
npm i @pluginjs/tooltip
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/tooltip/dist/tooltip.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/tooltip/dist/tooltip.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/tooltip/dist/tooltip.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/tooltip/dist/tooltip.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Tooltip from "@pluginjs/tooltip"
import "@pluginjs/tooltip/dist/tooltip.css"

Tooltip.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/tooltip/dist/tooltip.css")
const Tooltip = require("@pluginjs/tooltip")

Tooltip.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/tooltip/dist/tooltip.css">
<script src="https://unpkg.com/@pluginjs/tooltip/dist/tooltip.js"></script>
<script>
  Pj.tooltip('.element', options)
</script>
```

## API

### Options

Options are called on tooltip instances through the tooltip options itself.
You can also save the instances to variable for further use.

Name | Description | Default--|--|--
`"theme"` | Set plugin theme option | `null`
`"animation"` | Set plugin animation | `true`
`"template"` | Set default template | `function() {...}`
`"trigger"` | Set trigger action list | `hover focus`
`"hideOutClick"` | Set when clicking outside of the tooltip, trigger hide event | `false`
`"title"` | Set default title value if title attribute isn't present | ``
`"delay"` | Set delay (allow number or allow { "show": 500, "hide": 100 } pattern) | `0`
`"html"` | Set is enable html or not | `false`
`"selector"` | Set if a selector is provided, popover objects will be delegated to the specified targets | `false`
`"placement"` | Set position of plugin | `top`
`"container"` | Set is enabled container | `false`

### Events

Events are called on tooltip instances through the tooltip events itself.
You can also save the instances to variable for further use.

Name | Description--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"hide"` | Get fired when plugin has hidden
`"hidden"` | Gets fired when plugin has hidden
`"show"` | Gets fired when plugin has show
`"shown"` | Gets fired when plugin has shown
`"inserted"` | Gets fired when plugin has inserted

### Methods

Methods are called on tooltip instances through the tooltip method itself.
You can also save the instances to variable for further use.

Name | Description--|--
`"show"` | Show this plugin
`"hide"` | Hidden this plugin
`"toggle"` | Active event by event name
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default--||
`"NAMESPACE"` | Declare plugin namespace | `pj-tooltip`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"TOOLTIP"` | Declare tooltip node | `{namespace}`
`"TOOLTIPINNER"` | Declare tooltip inner node | `{namespace}-inner`
`"SHOW"` | Announce plugin is in show status | `{namespace}-show`
`"FADE"` | Announce plugin is in fade animation mode | `{namespace}-fade`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/tooltip is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/tooltip project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
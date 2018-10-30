# Popover

[![npm package](https://img.shields.io/npm/v/@pluginjs/popover.svg)](https://www.npmjs.com/package/@pluginjs/popover)

A flexible modern popover js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/popover/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/popover
```

#### NPM

```javascript
npm i @pluginjs/popover
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/popover/dist/popover.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/popover/dist/popover.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/popover/dist/popover.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/popover/dist/popover.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Popover from "@pluginjs/popover"
import "@pluginjs/popover/dist/popover.css"

Popover.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/popover/dist/popover.css")
const Popover = require("@pluginjs/popover")

Popover.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/popover/dist/popover.css">
<script src="https://unpkg.com/@pluginjs/popover/dist/popover.js"></script>
<script>
  Pj.popover('.element', options)
</script>
```

## API

### Options

Options are called on popover instances through the popover options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"template"` | Set default template | `function() {...}`
`"templates"` | Set default templates | `{}`
`"content"` | Set content | ``
`"html"` | Set html | `true`
`"close"` | Set close | `false`
`"trigger"` | Set trigger | `click`
`"hideOutClick"` | Set hideOutClick | `true`
`"placement"` | Set placement | `right`

### Events

Events are called on popover instances through the popover events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"hide"` | Gets fired when plugin has hide
`"hidden"` | Gets fired when plugin has hidden
`"show"` | Gets fired when plugin has show
`"shown"` | Gets fired when plugin has shown
`"inserted"` | Gets fired when plugin has inserted

### Methods

Methods are called on popover instances through the popover method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin
`"toggle"` | Toggle plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-popover`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"POPOVER"` | Declare plugin popover | `{namespace}`
`"CONTENT"` | Declare plugin content | `{namespace}-content`
`"TITLE"` | Declare plugin title | `{namespace}-title`
`"CLOSE"` | Declare plugin close | `{namespace}-close`
`"SHOW"` | Declare plugin show | `{namespace}-show`
`"FADE"` | Declare plugin fade | `{namespace}-fade`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/popover is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/popover project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
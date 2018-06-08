# PopDialog

[![npm package](https://img.shields.io/npm/v/@pluginjs/pop-dialog.svg)](https://www.npmjs.com/package/@pluginjs/pop-dialog)

A flexible modern pop-dialog js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/popDialog/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/pop-dialog
```

#### NPM

```javascript
npm i @pluginjs/pop-dialog
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/pop-dialog/dist/pop-dialog.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/pop-dialog/dist/pop-dialog.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/pop-dialog/dist/pop-dialog.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/pop-dialog/dist/pop-dialog.min.css">
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
import PopDialog from "@pluginjs/pop-dialog"
import "@pluginjs/pop-dialog/dist/pop-dialog.css"

PopDialog.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/pop-dialog/dist/pop-dialog.css")
const PopDialog = require("@pluginjs/pop-dialog")

PopDialog.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/pop-dialog/dist/pop-dialog.css">
  <script async src="https://unpkg.com/@pluginjs/pop-dialog/dist/pop-dialog.js"></script>
</head>
```

```javascript
Pj.popDialog('.element', options);
```

---

## API

### Options

Options are called on popDialog instances through the popDialog options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"hideOutClick"` | Set hideOutClick | `true`
`"placement"` | Set placement | `left`
`"constrainToWindow"` | Set constrainTowindow | `false`
`"constrainToScrollParent"` | Set constrainToScrollParent | `false`
`"template"` | Set default template | `function() {...}`
`"templates"` | Set default templates | `{}`
`"buttons"` | Set default button | `{}`

### Events

Events are called on popDialog instances through the popDialog events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
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

Methods are called on popDialog instances through the popDialog method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"do"` | Set do function
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin
`"toggle"` | Toggle plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-popover`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"POPDIALOG"` | Declare plugin dialog | `{namespace}-dialog`
`"POPOVER"` | Declare plugin popover | `{namespace}`
`"CONTENT"` | Declare plugin content | `{namespace}-content`
`"TITLE"` | Declare plugin title | `{namespace}-title`
`"CLOSE"` | Announce plugin is close | `{namespace}-close`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"FADE"` | Announce plugin is fade | `{namespace}-fade`
`"BUTTON"` | Announce plugin is button | `{namespace}-button`
`"BUTTONCOLOR"` | Announce plugin is color | `{namespace}-button-{color}`
`"BUTTONS"` | Announce plugin is buttons | `{namespace}-buttons`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/pop-dialog is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/pop-dialog project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
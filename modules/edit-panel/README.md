# EditPanel

[![npm package](https://img.shields.io/npm/v/@pluginjs/edit-panel.svg)](https://www.npmjs.com/package/@pluginjs/edit-panel)

A flexible modern edit-panel js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/editPanel/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/edit-panel
```

#### NPM

```javascript
npm i @pluginjs/edit-panel
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/edit-panel/dist/edit-panel.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/edit-panel/dist/edit-panel.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/edit-panel/dist/edit-panel.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/edit-panel/dist/edit-panel.min.css">
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
import EditPanel from "@pluginjs/edit-panel"
import "@pluginjs/edit-panel/dist/edit-panel.css"

EditPanel.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/edit-panel/dist/edit-panel.css")
const EditPanel = require("@pluginjs/edit-panel")

EditPanel.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/edit-panel/dist/edit-panel.css">
  <script async src="https://unpkg.com/@pluginjs/edit-panel/dist/edit-panel.js"></script>
</head>
```

```javascript
Pj.editPanel('.element', options);
```

---

## API

### Options

Options are called on editPanel instances through the editPanel options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"init"` | Set plugin init option | `{&quot;icon&quot;:&quot;icon-picture&quot;,&quot;text&quot;:&quot;default text&quot;}`
`"components"` | Set plugin components option | `[{&quot;title&quot;:&quot;&quot;,&quot;element&quot;:null,&quot;type&quot;:&quot;&quot;,&quot;options&quot;:{}}]`
`"hasSelector"` | Set plugin is  hasSelector or not | `true`
`"selector"` | Set plugin selector option | `{&quot;title&quot;:&quot;default selector title&quot;,&quot;icon&quot;:&quot;icon-close&quot;}`
`"action"` | Set plugin action option | `{&quot;panel&quot;:{&quot;cancel&quot;:{&quot;title&quot;:&quot;Cancel&quot;,&quot;class&quot;:&quot;&quot;},&quot;save&quot;:{&quot;title&quot;:&quot;Save&quot;,&quot;class&quot;:&quot;&quot;}},&quot;selector&quot;:{&quot;cancel&quot;:{&quot;title&quot;:&quot;Cancel&quot;,&quot;class&quot;:&quot;&quot;},&quot;save&quot;:{&quot;title&quot;:&quot;Use It&quot;,&quot;class&quot;:&quot;&quot;}}}`
`"templates"` | Set default templates | `{}`

### Events

Events are called on editPanel instances through the editPanel events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"openPanel"` | Get fired when plugin has openPanel
`"closePanel"` | Get fired when plugin has closePanel
`"openSelector"` | Get fired when plugin has openSelector
`"closeSelector"` | Get fired when plugin has closeSelector

### Methods

Methods are called on editPanel instances through the editPanel method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"openPanel"` | Show openPanel if it is hide
`"closePanel"` | Hide openPanel
`"openSelector"` | DisableSelect is true return false
`"closeSelector"` | hasSelector is false return false
`"disabledSelector"` | DisabledSelector the defaults is true
`"enabledSelector"` | EnabledSelector the defaults is false

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-editPanel`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"SHOW"` | Declare plugin show | `{namespace}-show`
`"FILL"` | Declare plugin fill | `{namespace}-fill`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"DATA"` | Declare plugin data | `{namespace}-data`
`"INIT"` | Declare plugin init | `{namespace}-init`
`"INFO"` | Declare plugin info | `{namespace}-info`
`"INFOCONTENT"` | Declare plugin infocontent | `{namespace}-info-content`
`"EDITOR"` | Declare plugin deitor | `{namespace}-editor`
`"REMOVE"` | Declare plugin remove | `{namespace}-remove`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"PREVIEW"` | Declare plugin preview | `{namespace}-preview`
`"PREVIEWCONTENT"` | Declare plugin previwcontent | `{namespace}-preview-content`
`"COMPONENT"` | Declare plugin component | `{namespace}-component`
`"COMPONENTTITLE"` | Declare plugin componenttile | `{namespace}-component-title`
`"COMPONENTCONTENT"` | Declare plugin componentcontent | `{namespace}-component-content`
`"SELECTOR"` | Declare plugin selector | `{namespace}-selector`
`"SELECTORWRAP"` | Declare plugin selector wrap | `{namespace}-selector-wrap`
`"SELECTORTITLE"` | Declare plugin selector title | `{namespace}-selector-title`
`"SELECTORCONTENT"` | Declare plugin selector content | `{namespace}-selector-content`
`"SELECTORCONTENTTITLE"` | Declare plugin selector content title | `{namespace}-selector-content-title`
`"SELECTORLIST"` | Declare plugin selector list | `{namespace}-selector-list`
`"SELECTORITEM"` | Declare plugin selector item | `{namespace}-selector-item`
`"ACTION"` | Declare plugin action | `{namespace}-action`
`"CANCEL"` | Declare plugin cancel | `{namespace}-cancel`
`"SAVE"` | Declare plugin save | `{namespace}-save`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/edit-panel is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/edit-panel project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
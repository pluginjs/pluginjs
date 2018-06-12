# AutoComplete

[![npm package](https://img.shields.io/npm/v/@pluginjs/auto-complete.svg)](https://www.npmjs.com/package/@pluginjs/auto-complete)

A flexible modern auto-complete js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/autoComplete/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/auto-complete
```

#### NPM

```javascript
npm i @pluginjs/auto-complete
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.min.css">
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
import AutoComplete from "@pluginjs/auto-complete"
import "@pluginjs/auto-complete/dist/auto-complete.css"

AutoComplete.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/auto-complete/dist/auto-complete.css")
const AutoComplete = require("@pluginjs/auto-complete")

AutoComplete.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.css">
<script src="https://unpkg.com/@pluginjs/auto-complete/dist/auto-complete.js"></script>
<script>
  Pj.autoComplete('.element', options)
</script>
```

---

## API

### Options

Options are called on autoComplete instances through the autoComplete options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"data"` | Set plugin data option | `null`
`"keyboard"` | Set plugin keyboard event | `true`
`"ajax"` | Use AJAX requests to get JSON data | `false`
`"minChars"` | Set plugin the smallest character | `1`
`"maxItems"` | Set plugin the most options | `5`
`"disabled"` | Disable plugin | `false`
`"panelWidth"` | Set plugin panel width | `null`
`"sensitivity"` | Set plugin sensitivity | `false`
`"highlight"` | Set plugin is highlight or not | `false`
`"group"` | Set the plugin template content | `false`
`"placeholder"` | Set input box prompt information | `Please Search...`
`"templates"` | Set default templates | `{}`
`"render"` | Plugin rendering | `function() {...}`
`"source"` | return matching text | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`
`"onChange"` | The onchange event occurs when the content of the domain changes | `function() {...}`

### Events

Events are called on autoComplete instances through the autoComplete events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"change"` | Gets fired when plugin has changed
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

### Methods

Methods are called on autoComplete instances through the autoComplete method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"open"` | Open plugin
`"close"` | Close plugin
`"clear"` | clear plugin
`"next"` | Set value of next button
`"prev"` | Set value of prev button
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-autoComplete`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"INPUT"` | Declare plugin input | `pj-input {namespace}-input`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"CLOSE"` | Declare plugin close | `{namespace}-close`
`"ITEM"` | Declare plugin item | `{namespace}-item`
`"RESULT"` | Declare plugin result | `{namespace}-result`
`"MARK"` | Declare plugin mark | `{namespace}-mark`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"GROUP"` | Declare plugin group | `{namespace}-group`
`"GROUPTITLE"` | Declare plugin group title | `{namespace}-group-title`
`"GROUPCONTENTS"` | Declare plugin group contents | `{namespace}-group-contents`
`"GROUPSHOW"` | Declare plugin group show | `{namespace}-group-show`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"OPEN"` | Announce plugin is open | `{namespace}-open`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/auto-complete is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/auto-complete project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
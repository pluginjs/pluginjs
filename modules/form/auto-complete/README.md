# AutoComplete
> A flexible modern auto-complete js plugin.
## Introduction

#### [Demo]()
---
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
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import autoComplete from "@pluginjs/auto-complete"
```

CommonJS
```javascript
require("@pluginjs/auto-complete")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/auto-complete.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/auto-complete.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/auto-complete.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/auto-complete.min.css">
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
Pj.autoComplete('.element', options);
```
---
## API

### Options:
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

### Events:
Events are called on autoComplete instances through the autoComplete events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"change"` | Gets fired when plugin has changed
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

```
### Methods:
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

**example:**
```javascript
Pj.$autoComplete('.element', enable)
Pj.$autoComplete('.element', enable, "foo")
Pj.$autoComplete('.element', enable, "foo", "bar")
```

### Classes:
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



### Dependencies:
- `[object Object]`

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
Version: 0.2.20

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
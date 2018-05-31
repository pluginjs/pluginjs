# Popover
> A flexible modern popover js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/popover
```
#### NPM
```javascript
npm i @pluginjs/popover
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import popover from "@pluginjs/popover"
```

CommonJS
```javascript
require("@pluginjs/popover")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/popover.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/popover.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/popover.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/popover.min.css">
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
Pj.popover('.element', options);
```
---
## API

### Options:
Options are called on popover instances through the popover options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"template"` | Set default template | `function() {...}`
`"templates"` | Set default templates | `{}`
`"content"` | Set content | ``
`"html"` | Set html | `true`
`"close"` | Set close | `false`
`"trigger"` | Set trigger | `click`
`"hideOutClick"` | Set hideOutClick | `true`
`"placement"` | Set placement | `right`

### Events:
Events are called on popover instances through the popover events itself.
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

```
### Methods:
Methods are called on popover instances through the popover method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin
`"toggle"` | Toggle plugin
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$popover('.element', show)
Pj.$popover('.element', show, "foo")
Pj.$popover('.element', show, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-popover`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"POPOVER"` | Declare plugin popover | `{namespace}`
`"CONTENT"` | Declare plugin content | `{namespace}-content`
`"TITLE"` | Declare plugin title | `{namespace}-title`
`"CLOSE"` | Declare plugin close | `{namespace}-close`
`"SHOW"` | Declare plugin show | `{namespace}-show`
`"FADE"` | Declare plugin fade | `{namespace}-fade`
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
Version: 0.2.19

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
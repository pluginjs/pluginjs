# Tabs
> A flexible modern tabs js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/tabs
```
#### NPM
```javascript
npm i @pluginjs/tabs
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import tabs from "@pluginjs/tabs"
```

CommonJS
```javascript
require("@pluginjs/tabs")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/tabs.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/tabs.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/tabs.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/tabs.min.css">
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
Pj.tabs('.element', options);
```
---
## API

### Options:
Options are called on tabs instances through the tabs options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"navSelector"` | Set nav dom selector | `null`
`"contentSelector"` | Set content dom selector | `+`
`"navPosition"` | Set nav position | `null`
`"initialIndex"` | Setup index of tab list | `0`
`"ajax"` | Set is enabled ajax to loading data | `false`
`"cached"` | Set ajax data could be cached or not | `false`
`"history"` | Set history | `false`
`"historyAttr"` | Set history attribute | `id`
`"keyboard"` | Set keyboard | `false`
`"effect"` | Set effect | `fadeIn`
`"duration"` | Set duration | `300`
`"event"` | Set action of event handle | `click`
`"breakWidth"` | Set break width value | `null`
`"navLabelSelector"` | Set nav label dom selector | `null`
`"navWrapSelector"` | Set nav wrap selector | `null`
`"navLabelTpl"` | Set nav label html | `&lt;a href&#x3D;&quot;javascript:void(0)&quot;&gt;&lt;i class&#x3D;&#x27;icon-char icon-chevron-down&#x27;&gt;&lt;/i&gt;tab1&lt;/a&gt;`
`"navWrapTpl"` | Set nav wrap html | `&lt;div&gt;&lt;/div&gt;`
`"resizeReference"` | Set resize reference | `window`
`"responsiveMode"` | Set responsive mode | `drop`
`"onInit"` | Set initial callback | `null`
`"onReady"` | Set ready callback | `null`

### Events:
Events are called on tabs instances through the tabs events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"active"` | Get fired when plugin has actived
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"resize"` | Get fired when plugin has resize
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy

```
### Methods:
Methods are called on tabs instances through the tabs method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Refresh plugin by new options
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"getTabs"` | Get tabs jquery element
`"getPanes"` | Get panes jquery element
`"getCurrentPane"` | Get current pane jquery element
`"getCurrentTab"` | Get current tab jquery element
`"getIndex"` | Get current index
`"getSize"` | Get current size
`"next"` | Go next tab
`"prev"` | Go prev tab
`"add"` | Add a tab by label, content, and index
`"remove"` | Remove a tab by index
`"append"` | Append a tab by label and content

**example:**
```javascript
Pj.$tabs('.element', update)
Pj.$tabs('.element', update, "foo")
Pj.$tabs('.element', update, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-tabs`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"ELEMENT"` | Declare tabs element | `{namespace}`
`"RESPONSIVE"` | Declare responsive node | `{namespace}-{responsiveMode}`
`"NAVLABEL"` | Declare nav label | `{namespace}-nav-label`
`"NAVWRAP"` | Declare nav wrap | `{namespace}-nav-wrap`
`"DROPOPEN"` | Announce drop open | `{namespace}-drop-open`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"NAV"` | Declare nav dom node | `{namespace}-nav`
`"CONTENT"` | Declare content node | `{namespace}-content`
`"LOADING"` | Announce plugin is loading | `{namespace}-loading`



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
Version: 0.2.22

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
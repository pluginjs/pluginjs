# SectionScroll
> A flexible modern section-scroll js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/section-scroll
```
#### NPM
```javascript
npm i @pluginjs/section-scroll
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import sectionScroll from "@pluginjs/section-scroll"
```

CommonJS
```javascript
require("@pluginjs/section-scroll")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/section-scroll.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/section-scroll.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/section-scroll.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/section-scroll.min.css">
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
Pj.sectionScroll('.element', options);
```
---
## API

### Options:
Options are called on sectionScroll instances through the sectionScroll options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"itemSelector"` | Set itemSelector | ``
`"titleSelector"` | Set titleSelector | ``
`"animation"` | Set animation | `scroll`
`"duration"` | Set duretion | ``
`"easing"` | Set easing | ``
`"touch"` | Set touch | `true`
`"mousewheel"` | Set mousewheel | `true`
`"touchSensitivity"` | Set touchSensitivity | `5`
`"dots"` | Set dots | `{&quot;theme&quot;:null,&quot;items&quot;:null,&quot;default&quot;:null,&quot;direction&quot;:&quot;vertical&quot;,&quot;valueFrom&quot;:&quot;data-href&quot;,&quot;template&quot;:{}}`
`"template"` | Set default template | `function() {...}`

### Events:
Events are called on sectionScroll instances through the sectionScroll events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled

```
### Methods:
Methods are called on sectionScroll instances through the sectionScroll method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin
`"next"` | Set next function
`"previous"` | Set previous function
`"goTo"` | Set value of goTo
`"scrollTo"` | Set value of scrollTo
`"getId"` | Set value of getId
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin

**example:**
```javascript
Pj.$sectionScroll('.element', destroy)
Pj.$sectionScroll('.element', destroy, "foo")
Pj.$sectionScroll('.element', destroy, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-sectionScroll`
`"DOTS"` | Declare plugin dots | `{namespace}-dots`
`"SECTION"` | Declare plugin section | `{namespace}-section`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"OPEN"` | Declare plugin open | `{namespace}-open`
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
Version: 0.2.18

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
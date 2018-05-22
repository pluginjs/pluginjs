# Headroom
> A flexible modern headroom js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/headroom
```
#### NPM
```javascript
npm i @pluginjs/headroom
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import headroom from "@pluginjs/headroom"
```

CommonJS
```javascript
require("@pluginjs/headroom")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/headroom.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/headroom.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/headroom.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/headroom.min.css">
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
Pj.headroom('.element', options);
```
---
## API

### Options:
Options are called on headroom instances through the headroom options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"tolerance"` | normalize Tolerance, Mainly used in pinned mode | `{&quot;down&quot;:10,&quot;up&quot;:20}`
`"offset"` | Anchor offset, Mainly used for pinned mode and stick mode | `0`
`"scroller"` | Scroll element | `window`
`"mode"` | Different judgments | `pinned`
`"offsetSide"` | If offset is an element selector, you can specify his size | `top`

### Events:
Events are called on headroom instances through the headroom events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled

```
### Methods:
Methods are called on headroom instances through the headroom method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin
`"disable"` | Disable plugin
`"enable"` | Enabled plugin if plugin is disabled

**example:**
```javascript
Pj.$headroom('.element', destroy)
Pj.$headroom('.element', destroy, "foo")
Pj.$headroom('.element', destroy, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-headroom`
`"PINNED"` | Announce plugin is pinned | `{namespace}-pinned`
`"UNPINNED"` | Announce plugin is unpinned | `{namespace}-unpinned`
`"TOP"` | Announce plugin is top | `{namespace}-top`
`"NOTTOP"` | Announce plugin is notTop | `{namespace}-notTop`
`"STICK"` | Announce plugin is stick | `{namespace}-stick`
`"UNSTICK"` | Announce plugin is unstick | `{namespace}-unstick`



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
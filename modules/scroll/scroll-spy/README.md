# ScrollSpy
> A flexible modern scroll-spy js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/scroll-spy
```
#### NPM
```javascript
npm i @pluginjs/scroll-spy
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import scrollSpy from "@pluginjs/scroll-spy"
```

CommonJS
```javascript
require("@pluginjs/scroll-spy")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-spy.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-spy.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-spy.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-spy.min.css">
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
Pj.scrollSpy('.element', options);
```
---
## API

### Options:
Options are called on scrollSpy instances through the scrollSpy options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"itemSelector"` | You must include the href data | `a`
`"activeClass"` | Current anchor avtiveItem | `active`
`"threshold"` | Offset of anchor | `0`
`"hashTimeout"` | Delay change hash | `600`
`"hrefFrom"` | Anchor element selector | `data-href`
`"changeHash"` | Whether you need to change the hash | `true`
`"cloestActive"` | Find the element you want to add activeClass | `parent`
`"reference"` | Anchor reference direction | `top`

### Events:
Events are called on scrollSpy instances through the scrollSpy events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"change"` | Gets fired when plugin is changed
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled

```
### Methods:
Methods are called on scrollSpy instances through the scrollSpy method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin
`"getCurrHref"` | get the current item Id
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin

**example:**
```javascript
Pj.$scrollSpy('.element', destroy)
Pj.$scrollSpy('.element', destroy, "foo")
Pj.$scrollSpy('.element', destroy, "foo", "bar")
```



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
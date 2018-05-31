# ScrollTo
> A flexible modern scroll-to js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/scroll-to
```
#### NPM
```javascript
npm i @pluginjs/scroll-to
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import scrollTo from "@pluginjs/scroll-to"
```

CommonJS
```javascript
require("@pluginjs/scroll-to")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-to.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-to.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-to.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/scroll-to.min.css">
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
Pj.scrollTo('.element', options);
```
---
## API

### Options:
Options are called on scrollTo instances through the scrollTo options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"selector"` | Set selector | `[data-scrollto]`
`"href"` | Set href | `data-scrollto`
`"duration"` | Set duretion | `500`
`"easing"` | Set easting | `ease`
`"offsetTop"` | Set offsetTop | `50`
`"mobile"` | Set mobile | `{&quot;width&quot;:768,&quot;duration&quot;:500,&quot;easing&quot;:&quot;ease&quot;}`

### Events:
Events are called on scrollTo instances through the scrollTo events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"jump"` | Gets fired when plugin has jump
`"done"` | Gets fired when plugin has done

```
### Methods:
Methods are called on scrollTo instances through the scrollTo method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"jump"` | Set jump function
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$scrollTo('.element', jump)
Pj.$scrollTo('.element', jump, "foo")
Pj.$scrollTo('.element', jump, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-scrollTo`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"ANIMATING"` | Declare plugin animating | `{namespace}-animating`



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
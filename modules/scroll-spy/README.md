# ScrollSpy

[![npm package](https://img.shields.io/npm/v/@pluginjs/scroll-spy.svg)](https://www.npmjs.com/package/@pluginjs/scroll-spy)

A flexible modern scroll-spy js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/scrollSpy/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/scroll-spy
```

#### NPM

```javascript
npm i @pluginjs/scroll-spy
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/scroll-spy/dist/scroll-spy.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/scroll-spy/dist/scroll-spy.min.js"></script>
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import ScrollSpy from "@pluginjs/scroll-spy"

ScrollSpy.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/scroll-spy/dist/scroll-spy.css")
const ScrollSpy = require("@pluginjs/scroll-spy")

ScrollSpy.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/scroll-spy/dist/scroll-spy.css">
<script src="https://unpkg.com/@pluginjs/scroll-spy/dist/scroll-spy.js"></script>
<script>
  Pj.scrollSpy('.element', options)
</script>
```

## API

### Options

Options are called on scrollSpy instances through the scrollSpy options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"selector"` | You must include the href data | `a`
`"activeClass"` | Current anchor avtiveItem | `active`
`"threshold"` | Offset of anchor | `0`
`"hashTimeout"` | Delay change hash | `600`
`"hrefFrom"` | Anchor element selector | `data-href`
`"changeHash"` | Whether you need to change the hash | `true`
`"cloestActive"` | Find the element you want to add activeClass | `parent`
`"reference"` | Anchor reference direction | `top`

### Events

Events are called on scrollSpy instances through the scrollSpy events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"change"` | Gets fired when plugin is changed
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled

### Methods

Methods are called on scrollSpy instances through the scrollSpy method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"destroy"` | Destroy plugin
`"getCurrHref"` | get the current item Id
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/scroll-spy is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/scroll-spy project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
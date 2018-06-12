# Lightbox

[![npm package](https://img.shields.io/npm/v/@pluginjs/lightbox.svg)](https://www.npmjs.com/package/@pluginjs/lightbox)

A flexible modern lightbox js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/lightbox/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/lightbox
```

#### NPM

```javascript
npm i @pluginjs/lightbox
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/lightbox/dist/lightbox.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/lightbox/dist/lightbox.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/lightbox/dist/lightbox.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/lightbox/dist/lightbox.min.css">
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
import Lightbox from "@pluginjs/lightbox"
import "@pluginjs/lightbox/dist/lightbox.css"

Lightbox.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/lightbox/dist/lightbox.css")
const Lightbox = require("@pluginjs/lightbox")

Lightbox.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/lightbox/dist/lightbox.css">
<script src="https://unpkg.com/@pluginjs/lightbox/dist/lightbox.js"></script>
<script>
  Pj.lightbox('.element', options)
</script>
```

---

## API

### Options

Options are called on lightbox instances through the lightbox options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"delegate"` | Picture element selector | `null`
`"clickBgClose"` | Click the background to turn off the lightbox, true or false | `true`
`"clickImageClose"` | Click the picture to turn off the lightbox, true or false | `true`
`"thumbs"` | Whether to display thumbnails, true or false | `true`
`"title"` | Whether to display title, true or false | `true`
`"templates"` | Element templates | `{}`

### Events

Events are called on lightbox instances through the lightbox events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready
`"enable"` | Gets fired when plugin is enabled
`"disable"` | Gets fired when plugin is disabled
`"destroy"` | Gets fired when plugin is destroy

### Methods

Methods are called on lightbox instances through the lightbox method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-lightbox`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"OVERLAY"` | Announce element is overlay | `{namespace}-overlay`
`"WRAP"` | Announce element is wrap | `{namespace}-wrap`
`"FOOTER"` | Announce element is footer | `{namespace}-footer`
`"CAPTION"` | Announce element is caption | `{namespace}-caption`
`"TITLE"` | Announce element is title | `{namespace}-title`
`"THUMBNAILS"` | Announce element is thumbnails | `{namespace}-thumbnails`
`"INNER"` | Announce element is thumbnails inner | `{namespace}-thumbnails-inner`
`"THUMB"` | Announce element is thumb | `{namespace}-thumb`
`"THUMBBG"` | Announce element is thumb background | `{namespace}-thumb-bg`
`"SLIDE"` | Announce element is slide | `{namespace}-slide`
`"ITEM"` | Announce element is item | `{namespace}-item`
`"ITEMINNER"` | Announce element is item inner | `{namespace}-item-inner`
`"LOADER"` | Announce element is loader | `{namespace}-loader`
`"CONTENT"` | Announce element is content | `{namespace}-content`
`"IMAGE"` | Announce element is image | `{namespace}-image`
`"VIDEO"` | Announce element is video | `{namespace}-video`
`"PLAY"` | Announce element is play | `{namespace}-play`
`"LOADING"` | Announce element is loading | `{namespace}-loading`
`"MAP"` | Announce element is map | `{namespace}-map`
`"IFRAME"` | Announce element is iframe | `{namespace}-iframe`
`"INLINE"` | Announce element is inline | `{namespace}-inline`
`"AJAX"` | Announce element is ajax | `{namespace}-ajax`
`"ARROW"` | Announce element is arrow | `{namespace}-arrow`
`"READY"` | Announce plugin Loading completed | `{namespace}-ready`
`"OVERFLOWHIDE"` | Announce the style of the element overflow-hide | `{namespace}-overflow-hide`
`"SLIDEBOTTOM"` | Announce the style of the element slide-bottom | `{namespace}-slide-bottom`
`"SLIDELEFT"` | Announce the style of the element slide-left | `{namespace}-slide-left`
`"SLIDERIGHT"` | Announce the style of the element slide-right | `{namespace}-slide-right`
`"SLIDETOP"` | Announce the style of the element slide-top | `{namespace}-slide-top`
`"THUMBACTIVE"` | Announce the style of the element thumb-active | `{namespace}-thumb-active`
`"THUMBSTRANSITION"` | Announce the style of the element thumbs-transition | `{namespace}-thumbs-transition`
`"SLIDETRANSITION"` | Announce the style of the element slide-transition | `{namespace}-slide-transition`
`"VERTICALCENTER"` | Announce the style of the element vertical-center | `{namespace}-vertical-center`
`"LOADED"` | Announce image loading completed | `{namespace}-loaded`
`"HIDE"` | Announce the style of the element hide | `{namespace}-hide`
`"TOPBAR"` | Announce element is topBar | `{namespace}-topBar`
`"COUNTER"` | Announce element is counter | `{namespace}-counter`
`"SHARE"` | Announce element is share | `{namespace}-share`
`"DOWNLOAD"` | Announce element is download | `{namespace}-download`
`"FULLSCREEN"` | Announce element is fullScreen | `{namespace}-fullScreen`
`"CLOSE"` | Announce element is close | `{namespace}-close`
`"WHITE"` | Announce plugin theme | `{namespace}-theme-white`
`"BLACK"` | Announce plugin theme | `{namespace}-theme-black`

### Translations

Name | EN | ZH
-----|------|-------
`"hello"` | Hello world | 世界你好
`"greeting"` | Hello {name}! | {name} 你好!
`"plurals"` | {count} product,{count} products,no product | {count} 个产品
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/lightbox is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/lightbox project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
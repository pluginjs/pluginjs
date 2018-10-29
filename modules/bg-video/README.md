# BgVideo

[![npm package](https://img.shields.io/npm/v/@pluginjs/bg-video.svg)](https://www.npmjs.com/package/@pluginjs/bg-video)

A flexible modern bg-video js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/bgVideo/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/bg-video
```

#### NPM

```javascript
npm i @pluginjs/bg-video
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/bg-video/dist/bg-video.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/bg-video/dist/bg-video.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/bg-video/dist/bg-video.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/bg-video/dist/bg-video.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import BgVideo from "@pluginjs/bg-video"
import "@pluginjs/bg-video/dist/bg-video.css"

BgVideo.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/bg-video/dist/bg-video.css")
const BgVideo = require("@pluginjs/bg-video")

BgVideo.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/bg-video/dist/bg-video.css">
<script src="https://unpkg.com/@pluginjs/bg-video/dist/bg-video.js"></script>
<script>
  Pj.bgVideo('.element', options)
</script>
```

## API

### Options

Options are called on bgVideo instances through the bgVideo options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"template"` | Main structure template | `function() {...}`
`"type"` | Different video sources, such as HTML5 Youtube Vimeo | ``
`"video"` | Video configuration | `{"id":"","url":"","mute":true,"repeat":true,"autoplay":true,"mobileImage":""}`

### Events

Events are called on bgVideo instances through the bgVideo events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"play"` | Gets fired when video is play
`"pause"` | Gets fired when video is pause
`"stop"` | Gets fired when video is stop

### Methods

Methods are called on bgVideo instances through the bgVideo method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"destroy"` | Destroy plugin
`"play"` | Play video
`"pause"` | Pause  video
`"stop"` | Stop video
`"setVolume"` | Set the video volume
`"change"` | Switch video

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-bgVideo`
`"OVERLAY"` | Declare plugin overlay | `{namespace}-overlay`
`"POINTEREVENTNONE"` | Event penetration effect | `pointer-events-none`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/bg-video is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/bg-video project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
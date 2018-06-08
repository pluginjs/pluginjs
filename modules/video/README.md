# Video

[![npm package](https://img.shields.io/npm/v/@pluginjs/video.svg)](https://www.npmjs.com/package/@pluginjs/video)

A flexible modern video js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/video/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/video
```

#### NPM

```javascript
npm i @pluginjs/video
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/video/dist/video.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/video/dist/video.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/video/dist/video.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/video/dist/video.min.css">
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
import Video from "@pluginjs/video"
import "@pluginjs/video/dist/video.css"

Video.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/video/dist/video.css")
const Video = require("@pluginjs/video")

Video.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/video/dist/video.css">
  <script async src="https://unpkg.com/@pluginjs/video/dist/video.js"></script>
</head>
```

```javascript
Pj.video('.element', options);
```

---

## API

### Options

Options are called on video instances through the video options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"template"` | Main structure template | `function() {...}`
`"templates"` | Template blocks | `{}`
`"url"` | Video url | ``
`"id"` | Video id | ``
`"type"` | Different video sources, such as HTML5 Youtube Vimeo | ``
`"autoplay"` | Whether to play automatically when loading video | `true`
`"loop"` | Whether to loop the video | `true`
`"controls"` | Whether to show the video controller | `false`
`"poster"` | Whether to display the poster | ``

### Events

Events are called on video instances through the video events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"load"` | Gets fired when video is loading
`"loaded"` | Gets fired when video is loaded
`"play"` | Gets fired when video is play
`"pause"` | Gets fired when video is pause
`"stop"` | Gets fired when video is stop
`"playend"` | Gets fired when video is playend
`"playerr"` | Gets fired when video is playerr

### Methods

Methods are called on video instances through the video method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"pause"` | Pause  video
`"load"` | Load video
`"play"` | Play video
`"stop"` | Stop video
`"volume"` | Set the video volume

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-video`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"POSTER"` | Declare plugin poster | `{namespace}-poster`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/video is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/video project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
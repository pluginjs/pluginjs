# BgVideo
> A flexible modern bg-video js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/bg-video
```
#### NPM
```javascript
npm i @pluginjs/bg-video
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import bgVideo from "@pluginjs/bg-video"
```

CommonJS
```javascript
require("@pluginjs/bg-video")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/bg-video.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/bg-video.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/bg-video.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/bg-video.min.css">
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
Pj.bgVideo('.element', options);
```
---
## API

### Options:
Options are called on bgVideo instances through the bgVideo options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"template"` | Main structure template | `function() {...}`
`"type"` | Different video sources, such as HTML5 Youtube Vimeo | ``
`"video"` | Video configuration | `{&quot;id&quot;:&quot;&quot;,&quot;url&quot;:&quot;&quot;,&quot;mute&quot;:true,&quot;repeat&quot;:true,&quot;autoplay&quot;:true,&quot;mobileImage&quot;:&quot;&quot;}`

### Events:
Events are called on bgVideo instances through the bgVideo events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin is ready
`"destroy"` | Gets fired when plugin is destroy
`"play"` | Gets fired when video is play
`"pause"` | Gets fired when video is pause
`"stop"` | Gets fired when video is stop

```
### Methods:
Methods are called on bgVideo instances through the bgVideo method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin
`"play"` | Play video
`"pause"` | Pause  video
`"stop"` | Stop video
`"setVolume"` | Set the video volume
`"change"` | Switch video

**example:**
```javascript
Pj.$bgVideo('.element', destroy)
Pj.$bgVideo('.element', destroy, "foo")
Pj.$bgVideo('.element', destroy, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-bgVideo`
`"OVERLAY"` | Declare plugin overlay | `{namespace}-overlay`
`"POINTEREVENTNONE"` | Event penetration effect | `pointer-events-none`



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
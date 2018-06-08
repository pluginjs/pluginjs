# VideoPicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/video-picker.svg)](https://www.npmjs.com/package/@pluginjs/video-picker)

A flexible modern video-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/videoPicker/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/video-picker
```

#### NPM

```javascript
npm i @pluginjs/video-picker
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/video-picker/dist/video-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/video-picker/dist/video-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/video-picker/dist/video-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/video-picker/dist/video-picker.min.css">
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
import VideoPicker from "@pluginjs/video-picker"
import "@pluginjs/video-picker/dist/video-picker.css"

VideoPicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/video-picker/dist/video-picker.css")
const VideoPicker = require("@pluginjs/video-picker")

VideoPicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/video-picker/dist/video-picker.css">
  <script async src="https://unpkg.com/@pluginjs/video-picker/dist/video-picker.js"></script>
</head>
```

```javascript
Pj.videoPicker('.element', options);
```

---

## API

### Options

Options are called on videoPicker instances through the videoPicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"locale"` | Set locale environment | `en`
`"sources"` | Set sources | `[&quot;YouTube&quot;,&quot;Vimeo&quot;,&quot;Local File&quot;]`
`"disabled"` | Disable plugin | `false`
`"date"` | Set data | `null`
`"selectCover"` | Set selectCover | `function() {...}`
`"selectLocalVideo"` | Set selectVideo | `function() {...}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events

Events are called on videoPicker instances through the videoPicker events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed

### Methods

Methods are called on videoPicker instances through the videoPicker method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"set"` | Set value by key
`"get"` | Get value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-videoPicker`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"BUTTON"` | Announce plugin is button | `{namespace}-button`
`"INIT"` | Announce plugin is init | `{namespace}-init`
`"INFOPOSTER"` | Announce plugin is infoposter | `{namespace}-info-poster`
`"EDITOR"` | Announce plugin is editor | `{namespace}-info-editor`
`"REMOVE"` | Declare plugin remove | `{namespace}-info-remove`
`"HOVER"` | Announce plugin is hover | `{namespace}-hover`
`"PANEL"` | Declare plugin panel | `{namespace}-panel`
`"DROPDOWNPANEL"` | Declare plugin dropdownpanel | `{namespace}-dropdown-panel`
`"CLOSE"` | Announce plugin is close | `{namespace}-close`
`"DATA"` | Declare plugin data | `{namespace}-data`
`"SOURCE"` | Declare plugin source | `{namespace}-source`
`"VIDEO"` | Declare plugin video | `{namespace}-video`
`"VIDEOPLAYING"` | Declare plugin videoplaying | `{namespace}-video-playing`
`"VIDEOLOADING"` | Declare plugin videoloading | `{namespace}-video-loading`
`"VIDEOANIMATE"` | Declare plugin videoanimate | `{namespace}-video-animate`
`"VIDEOACTION"` | Declare plugin videoaction | `{namespace}-video-action`
`"VIDEOBTN"` | Declare plugin videobtn | `{namespace}-video-btn`
`"VIDEOPOSTER"` | Declare plugin videoposter | `{namespace}-video-poster`
`"VIDEOURL"` | Declare plugin videourl | `{namespace}-video-url`
`"LOCALURL"` | Declare plugin local url | `{namespace}-local-url`
`"LOCALURLADD"` | Declare plugin local url add | `{namespace}-local-url-add`
`"LOCALURLCHANGE"` | Declare plugin local url change | `{namespace}-local-url-change`
`"LOCALURLDELETE"` | Declare plugin local url delete | `{namespace}-local-url-delete`
`"LOCALURLSELECTED"` | Declare plugin local url selected | `{namespace}-local-url-selected`
`"RATIO"` | Declare plugin ratio | `{namespace}-ratio`
`"POSTER"` | Declare plugin poster | `{namespace}-poster`
`"POSTERSELECTED"` | Declare plugin poster selected | `{namespace}-poster-selected`
`"POSTERADD"` | Declare plugin poster add | `{namespace}-poster-add`
`"POSTERCHANGE"` | Declare plugin poster change | `{namespace}-poster-change`
`"POSTERDELETE"` | Declare plugin poster delete | `{namespace}-poster-delete`
`"WARNING"` | Declare plugin warning | `{namespace}-warning`

### Translations

Name | EN | ZH
-----|------|-------
`"inputPlaceholder"` | Add Video | 添加视频
`"videoSource"` | Video Source | 视频类型
`"videoURL"` | Video URL | 视频URL
`"aspectRatio"` | Aspect Ratio | 长宽比
`"chooseVideo"` | Choose Video | 选择视频
`"poster"` | Poster | 海报
`"addVideo"` | Add Video | 添加视频
`"addPoster"` | Add Poster | 添加海报
`"changeVideo"` | Change Video | 修改视频
`"changePoster"` | Change Poster | 修改海报
`"save"` | Save | 保存
`"cancel"` | Cancel | 取消
`"deleteTitle"` | Are you sure you want to delete? | 你确定要删除？
`"delete"` | Delete | 删除
`"useIt"` | Use It | 使用
`"inputURL"` | Please input URL | 请输入URL
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/video-picker is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/video-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.
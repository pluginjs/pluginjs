# Notice
> A flexible modern notice js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/notice
```
#### NPM
```javascript
npm i @pluginjs/notice
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import notice from "@pluginjs/notice"
```

CommonJS
```javascript
require("@pluginjs/notice")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/notice.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/notice.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/notice.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/notice.min.css">
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
Pj.notice('.element', options);
```
---
## API

### Options:
Options are called on notice instances through the notice options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Add plugin theme option | `null`
`"template"` | Add template | `function() {...}`
`"templates"` | Add templates | `{}`
`"locale"` | Add locale env declare | `en`
`"html"` | Set enable html or not | `true`
`"localeFallbacks"` | Set enable localeFallbacks | `true`
`"content"` | Set content | ``
`"contentAlignment"` | Set where is content alignment | `center`
`"allowClose"` | Set allow close or not | `true`
`"closeBottonColor"` | Set close button color | ``
`"backgroundColor"` | Set background color | `null`
`"backgroundImage"` | Set background image | `null`
`"fontColor"` | Set font color | `null`
`"buttons"` | Set buttons | `{&quot;ok&quot;:{&quot;title&quot;:&quot;Ok&quot;,&quot;class&quot;:&quot;pj-btn pj-btn-success&quot;}}`
`"buttonAlign"` | Set button align | `center`
`"timeout"` | Set timeout | `30000`
`"fixedWidth"` | Set fixed width or not | `false`
`"layout"` | Set layout location | `top`

### Events:
Events are called on notice instances through the notice events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hidden
`"destroy"` | Gets fired when plugin is destroy
`"ready"` | Gets fired when plugin is ready

```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-notice`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"CONTENT"` | Declare plugin content | `{namespace}-content`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"CLOSE"` | Declare plugin is close | `{namespace}-close`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"BUTTON"` | Declare plugin button | `{namespace}-btn`
`"BUTTONS"` | Declare plugin buttons | `{namespace}-buttons`
`"POSITION"` | Declare plugin position | `{namespace}-position`
`"BACKGROUND"` | Declare plugin background | `{namespace}-with-bg`



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
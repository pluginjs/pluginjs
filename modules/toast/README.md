# Toast

[![npm package](https://img.shields.io/npm/v/@pluginjs/toast.svg)](https://www.npmjs.com/package/@pluginjs/toast)

A flexible modern toast js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/toast/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/toast
```

#### NPM

```javascript
npm i @pluginjs/toast
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/toast/dist/toast.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toast/dist/toast.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/toast/dist/toast.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toast/dist/toast.min.css">
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
import Toast from "@pluginjs/toast"
import "@pluginjs/toast/dist/toast.css"

Toast.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/toast/dist/toast.css")
const Toast = require("@pluginjs/toast")

Toast.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/toast/dist/toast.css">
<script src="https://unpkg.com/@pluginjs/toast/dist/toast.js"></script>
<script>
  Pj.toast('.element', options)
</script>
```

---

## API

### Options

Options are called on toast instances through the toast options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"template"` | Set default template | `function() {...}`
`"templates"` | Set default templates | `{}`
`"locale"` | Set locale environment | `en`
`"html"` | Set is enable html or not | `true`
`"localeFallbacks"` | Set is enable locale fallback or not | `true`
`"content"` | Set content | ``
`"title"` | Set title | `This is Title`
`"titleColor"` | Set title color | ``
`"contentColor"` | Set content color | ``
`"closeBtnColor"` | Set close button color | ``
`"effect"` | Set effect | `fade`
`"allowClose"` | Set is allow close or not | `true`
`"duration"` | Set duretion | `3000`
`"stack"` | Set stack number | `6`
`"position"` | Set position | `bottom-right`
`"icon"` | Set default icon | `success`
`"icons"` | Set icons options | `{"success":["pj-icon pj-icon-check-circle","#4be1ab"],"info":["pj-icon pj-icon-exclamation-circle","#4c93d9"],"warning":["pj-icon pj-icon-exclamation-triangle","#dabd49"],"danger":["pj-icon pj-icon-times-circle","#f86b67"]}`
`"iconColor"` | Set icon color | ``
`"iconClass"` | Set icon class | ``
`"bgColor"` | Set bg color | `null`
`"buttons"` | Set buttons | `null`
`"loader"` | Set is enable loader or not | `true`
`"loaderBgColor"` | Set loader bg color | ``

### Events

Events are called on toast instances through the toast events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"show"` | Gets fired when plugin has show
`"hide"` | Gets fired when plugin has hidden
`"destroy"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-toast`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"CONTENT"` | Declare plugin content | `{namespace}-content`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"CLOSE"` | Announce plugin has closed | `{namespace}-close`
`"WRAP"` | Declare wrap node | `{namespace}-wrap`
`"ICON"` | Declare icon node | `{namespace}-icon`
`"TITLE"` | Declare title node | `{namespace}-title`
`"POSITION"` | Declare position node | `{namespace}-{position}`
`"BUTTON"` | Declare button node | `{namespace}-btn`
`"BUTTONS"` | Declare buttons node | `{namespace}-buttons`
`"LOADER"` | Declare loader node | `{namespace}-loader`
`"STRIPED"` | Declare striped node | `{namespace}-loader-striped`
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/toast is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/toast project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
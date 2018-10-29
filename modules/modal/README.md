# Modal

[![npm package](https://img.shields.io/npm/v/@pluginjs/modal.svg)](https://www.npmjs.com/package/@pluginjs/modal)

A flexible modern modal js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/modal/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/modal
```

#### NPM

```javascript
npm i @pluginjs/modal
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/modal/dist/modal.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/modal/dist/modal.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/modal/dist/modal.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/modal/dist/modal.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Modal from "@pluginjs/modal"
import "@pluginjs/modal/dist/modal.css"

Modal.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/modal/dist/modal.css")
const Modal = require("@pluginjs/modal")

Modal.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/modal/dist/modal.css">
<script src="https://unpkg.com/@pluginjs/modal/dist/modal.js"></script>
<script>
  Pj.modal('.element', options)
</script>
```

## API

### Options

Options are called on modal instances through the modal options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Add plugin theme option | `null`
`"template"` | The main element templates | `function() {...}`
`"templates"` | Element templates | `{}`
`"autoDestroy"` | Remove the element when closed, true or false | `true`
`"title"` | Whether to display title, true or false | ``
`"content"` | Whether to display content, true or false | ``
`"html"` | Whether the content is html, true or false | `true`
`"close"` | Whether to display close button, true or false | `true`
`"locale"` | Multilingual settings | `en`
`"localeFallbacks"` | Multilingual settings | `true`
`"buttons"` | Whether to display button | `null`
`"overlay"` | Whether to display overlay, true or false | `true`
`"overlayCloseOnClick"` | Click the background to turn off the modal, true or false | `true`
`"appendTo"` | where modal will be inserted | `body`
`"effect"` | Open and close the animation | `fadeScale`
`"contentAlignment"` | content alignment, left, center or right | `left`
`"buttonAlignment"` | button alignment, left, center or right | `right`
`"titleAlignment"` | title alignment, left or center | `left`
`"defaultButtonClass"` | Default button style | `pj-btn pj-btn-primary`
`"icon"` | Whether to display icon, If you need to fill in success, info or error | ``
`"icons"` | Default button style description | `{"success":["icon-check-circle","#4be1ab"],"info":["icon-exclamation-circle","#4c93d9"],"error":["icon-times-circle","#f86b67"]}`
`"iconColor"` | Modify the icon color | ``
`"iconClass"` | Add your icon | ``

### Events

Events are called on modal instances through the modal events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"open"` | Gets fired when plugin is destroy
`"close"` | Gets fired when plugin is close
`"destroy"` | Gets fired when plugin is destroy
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hide

### Methods

Methods are called on modal instances through the modal method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-modal`
`"ELEMENT"` | Declare plugin | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"CLOSE"` | Declare element is close | `{namespace}-close`
`"CONTENT"` | Declare element is body | `{namespace}-body`
`"TITLE"` | Declare element is title | `{namespace}-title`
`"ACTIVE"` | Declare plugin is actived | `{namespace}-active`
`"DISABLED"` | Declare plugin is disabled | `{namespace}-disabled`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"HEADER"` | Declare element is header | `{namespace}-header`
`"BUTTONS"` | Declare element is buttons | `{namespace}-buttons`
`"OVERLAY"` | Declare element is overlay | `{namespace}-overlay`
`"FADEIN"` | Declare the style of the element fadeIn | `{namespace}--fadeIn`
`"OPEN"` | Declare element is open | `{namespace}-open`
`"IN"` | Declare element is in | `{namespace}-in`
`"BUTTON"` | Declare element is button | `{namespace}-btn`
`"ICON"` | Declare element is icon | `{namespace}-icon`

### Translations

Name | EN | ZH
--||-
`"Cancel"` | Cancel | 取消
`"Yes"` | Yes | 确定

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/modal is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/modal project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
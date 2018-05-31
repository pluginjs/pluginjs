# Modal
> A flexible modern modal js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/modal
```
#### NPM
```javascript
npm i @pluginjs/modal
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import modal from "@pluginjs/modal"
```

CommonJS
```javascript
require("@pluginjs/modal")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/modal.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/modal.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/modal.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/modal.min.css">
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
Pj.modal('.element', options);
```
---
## API

### Options:
Options are called on modal instances through the modal options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
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
`"buttons"` | Whether to display button
              example
              buttons: {
                cancel: {
                  title: &#x27;cancel&#x27;,
                  class: &#x27;pj-btn pj-btn-outline&#x27;
                },
                active: {
                  title: &#x27;Share&#x27;,
                  class: &#x27;pj-btn pj-btn-danger&#x27;,
                  fn: function() {
                    // console.log(&#x27;active callback&#x27;)
                  }
                },
              },
             | `null`
`"overlay"` | Whether to display overlay, true or false | `true`
`"overlayClosesOnClick"` | Click the background to turn off the modal, true or false | `true`
`"appendTo"` | where modal will be inserted | `body`
`"effect"` | Open and close the animation | `fadeScale`
`"contentAlignment"` | content alignment, left, center or right | `left`
`"buttonAlignment"` | button alignment, left, center or right | `right`
`"titleAlignment"` | title alignment, left or center | `left`
`"defaultButtonClass"` | Default button style | `pj-btn pj-btn-primary`
`"icon"` | Whether to display icon, If you need to fill in success, info or error | ``
`"icons"` | Default button style description | `{&quot;success&quot;:[&quot;icon-check-circle&quot;,&quot;#4be1ab&quot;],&quot;info&quot;:[&quot;icon-exclamation-circle&quot;,&quot;#4c93d9&quot;],&quot;error&quot;:[&quot;icon-times-circle&quot;,&quot;#f86b67&quot;]}`
`"iconColor"` | Modify the icon color | ``
`"iconClass"` | Add your icon | ``

### Events:
Events are called on modal instances through the modal events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"open"` | Gets fired when plugin is destroy
`"close"` | Gets fired when plugin is close
`"destroy"` | Gets fired when plugin is destroy
`"show"` | Gets fired when plugin is show
`"hide"` | Gets fired when plugin is hide

```
### Methods:
Methods are called on modal instances through the modal method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$modal('.element', destroy)
Pj.$modal('.element', destroy, "foo")
Pj.$modal('.element', destroy, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
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


### Translations:
Name | EN | ZH
-----|------|-------
`"Cancel"` | Cancel | 取消
`"Yes"` | Yes | 确定


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
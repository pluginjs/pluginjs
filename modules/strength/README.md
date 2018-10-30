# Strength

[![npm package](https://img.shields.io/npm/v/@pluginjs/strength.svg)](https://www.npmjs.com/package/@pluginjs/strength)

A flexible modern strength js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/strength/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/strength
```

#### NPM

```javascript
npm i @pluginjs/strength
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/strength/dist/strength.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/strength/dist/strength.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/strength/dist/strength.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/strength/dist/strength.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Strength from "@pluginjs/strength"
import "@pluginjs/strength/dist/strength.css"

Strength.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/strength/dist/strength.css")
const Strength = require("@pluginjs/strength")

Strength.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/strength/dist/strength.css">
<script src="https://unpkg.com/@pluginjs/strength/dist/strength.js"></script>
<script>
  Pj.strength('.element', options)
</script>
```

## API

### Options

Options are called on strength instances through the strength options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"showMeter"` | rendering meter | `true`
`"showToggle"` | rendering toggle | `true`
`"usernameField"` | Set plugin usernameField option | ``
`"templates"` | Set default templates | `{"toggle":"<span class=\"input-group-addon\"><input type=\"checkbox\" class=\"{classes.TOGGLE}\" title=\"{label}\" /></span>","meter":"<div class=\"{classes.METER}\">{score}</div>","score":"<span class=\"label {classes.SCORE}\"></span>","main":"<div class=\"{classes.CONTAINER}\"><div class=\"input-group\">{input}{toggle}</div>{meter}</div>"}`
`"scoreLables"` | Set plugin scoreLables option | `{"empty":"Empty","invalid":"Invalid","weak":"Weak","good":"Good","strong":"Strong"}`
`"scoreClasses"` | Set plugin scoreClasses option | `{"empty":"","invalid":"label-danger","weak":"label-warning","good":"label-info","strong":"label-success"}`
`"emptyStatus"` | Set plugin emptyStatus option | `true`
`"scoreCallback"` | Set plugin scoreCallback option | `null`
`"statusCallback"` | Set plugin statusCallback option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set plugin is  localeFallbacks or not | `true`

### Events

Events are called on strength instances through the strength events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"check"` | Gets fired when plugin has check
`"statusChange"` | Gets fired when plugin has statusChange
`"toggle"` | Gets fired when plugin has toggle

### Methods

Methods are called on strength instances through the strength method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"getScore"` | Get score
`"getStatus"` | Get status
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-strength`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"STATUS"` | Declare plugin status | `{namespace}-{status}`
`"INPUT"` | Declare plugin input | `{namespace}-input`
`"TOGGLE"` | Declare plugin toggle | `{namespace}-toggle`
`"METER"` | Declare plugin meter | `{namespace}-meter`
`"SCORE"` | Declare plugin score | `{namespace}-score`
`"SHOWN"` | Declare plugin shown | `{namespace}-shown`

### Translations

Name | EN | ZH
--||-
`"Empty"` | Empty | 空
`"Invalid"` | Invalid | 无效
`"Weak"` | Weak | 弱
`"Good"` | Good | 中
`"Strong"` | Strong | 强
`"toggle"` | Show/Hide Password | 显示/隐藏 密码

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/strength is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/strength project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
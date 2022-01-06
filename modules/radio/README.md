# Radio

[![npm package](https://img.shields.io/npm/v/@pluginjs/radio.svg)](https://www.npmjs.com/package/@pluginjs/radio)

A flexible modern radio js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/radio/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/radio
```

#### NPM

```javascript
npm i @pluginjs/radio
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/radio/dist/radio.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/radio/dist/radio.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/radio/dist/radio.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/radio/dist/radio.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Radio from "@pluginjs/radio"
import "@pluginjs/radio/dist/radio.css"

Radio.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/radio/dist/radio.css")
const Radio = require("@pluginjs/radio")

Radio.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/radio/dist/radio.css">
<script src="https://unpkg.com/@pluginjs/radio/dist/radio.js"></script>
<script>
  Pj.radio('.element', options)
</script>
```

## API

### Options

Options are called on radio instances through the radio options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"classes"` | Set the button class name  | `{"button":"{namespace}-default"}`
`"disabled"` | Disabled plugin | `false`
`"getWrap"` | Get the parent element of each element | `function() {...}`
`"getLabel"` | Get the adjacent element of each element | `function() {...}`
`"getIcon"` | Get the descendants of each element | `function() {...}`
`"getGroup"` | Set the value of the input attribute | `function() {...}`
`"templates"` | Set default templates | `{}`

### Events

Events are called on radio instances through the radio events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"change"` | Gets fired when plugin has changed
`"check"` | Gets fired when plugin has check
`"uncheck"` | Gets fired when plugin has uncheck

### Methods

Methods are called on radio instances through the radio method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"check"` | Set check
`"uncheck"` | Set uncheck

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-radio`
`"WRAP"` | Declare plugin wrap | `{namespace}`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"ICON"` | Declare plugin icon | ``
`"CHECKED"` | Declare plugin checked | `{namespace}-checked`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disable`

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/radio is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/radio project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
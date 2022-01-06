# Easing

[![npm package](https://img.shields.io/npm/v/@pluginjs/easing.svg)](https://www.npmjs.com/package/@pluginjs/easing)

`easing` is a utility JavaScript library for animation effect.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/easing
```

#### NPM

```javascript
npm i @pluginjs/easing
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/easing/dist/easing.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/easing/dist/easing.min.js"></script>
```

## API

### get

Parameters

| Name | Type | Description |
|||-|
| name | `String` | easings name |

### bezier

Parameters

| Name | Type | Description |
|||-|
| mX1 | Number | bezier |
| mY1 | Number | bezier |
| mX2 | Number | bezier |
| mY2 | Number | bezier |

Returns

| Name | Type | Description |
|||-|
| BezierEasing | `String` | Bezier easing |

### register

Parameters

| Name | Type | Description |
|||-|
| name | `String` | easings name |
| mX1 | Number | bezier |
| mY1 | Number | bezier |
| mX2 | Number | bezier |
| mY2 | Number | bezier |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/easing is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/easing project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
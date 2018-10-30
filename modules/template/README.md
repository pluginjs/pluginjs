# Template

[![npm package](https://img.shields.io/npm/v/@pluginjs/template.svg)](https://www.npmjs.com/package/@pluginjs/template)

`template` is a utility JavaScript library for html template parse.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/template
```

#### NPM

```javascript
npm i @pluginjs/template
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/template/dist/template.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/template/dist/template.min.js"></script>
```

## API

### render

Parameters

| Name | Type | Description |
|||-|
| string | `String` | |
| args | `templateOptions[]` | |

Returns

| Name | Type | Description |
|||-|
| parsedResult | `String` | |

### compile

Parameters

| Name | Type | Description |
|||-|
| str | `String` | |

Returns

| Name | Type | Description |
|||-|
| compileFunction | `(args: templateOptions[]) => parsedResult` | |

### parse

Parameters

| Name | Type | Description |
|||-|
| str | `String` | |

Returns

| Name | Type | Description |
|||-|
| parsedResult | `String` | |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/template is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/template project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
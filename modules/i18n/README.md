# I18n

[![npm package](https://img.shields.io/npm/v/@pluginjs/i18n.svg)](https://www.npmjs.com/package/@pluginjs/i18n)

`i18n` is a utility JavaScript library for globalization.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/i18n
```

#### NPM

```javascript
npm i @pluginjs/i18n
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/i18n/dist/i18n.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/i18n/dist/i18n.min.js"></script>
```

## API

### hasTranslation

Parameters

| Name | Type | Description |
|||-|
| locale | `String` | |

Returns

| Name | Type | Description |
|||-|
| isExistsInTranslations | `Boolean` | |

### addTranslation

Parameters

| Name | Type | Description |
|||-|
| locale | `String` | |
| translation | `{ locale: String : {} }` | |

### getTranslation

Parameters

| Name | Type | Description |
|||-|
| locale | `String` | |

Returns

| Name | Type | Description |
|||-|
| translations | `Object` | |

### instance

Parameters

| Name | Type | Description |
|||-|
| options | `Object` | |

Returns

| Name | Type | Description |
|||-|
| interfaces | `{ translate: (key, args, locale) => message, setLocale: (locale: String) => {}), getLocale: () => _locale: Object }` | |

### setTranslations

Parameters

| Name | Type | Description |
|||-|
| translations | `{ locale: String: {} }` | |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/i18n is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/i18n project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
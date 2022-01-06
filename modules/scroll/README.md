# Scroll

[![npm package](https://img.shields.io/npm/v/@pluginjs/scroll.svg)](https://www.npmjs.com/package/@pluginjs/scroll)

`scroll` is a utility JavaScript library for scroll interface.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/scroll
```

#### NPM

```javascript
npm i @pluginjs/scroll
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/scroll/dist/scroll.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/scroll/dist/scroll.min.js"></script>
```

## API

### to

Parameters

| Name | Type | Description |
|||-|
| options | `ScrollToOptions` | |

ScrollToOptions

| Name | Type | Description |
| x | `Number` | |
| y | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### toX

Parameters

| Name | Type | Description |
|||-|
| x | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### toY

Parameters

| Name | Type | Description |
|||-|
| y | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### by

Parameters

| Name | Type | Description |
|||-|
| options | `ScrollByOptions` | |

ScrollToOptions

| Name | Type | Description |
| x | `Number` | |
| y | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### byX

Parameters

| Name | Type | Description |
|||-|
| x | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### byY

Parameters

| Name | Type | Description |
|||-|
| y | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### intoView

Parameters

| Name | Type | Description |
|||-|
| options | `ScrollIntoViewOptions` | |

ScrollIntoViewOptions

| Name | Type | Description |
| element | `HTMLElement` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

### top

Parameters

| Name | Type | Description |
|||-|
| options | `ScrollTopOptions` | |

ScrollTopOptions

| Name | Type | Description |
| element | `HTMLElement` | |
| offset | `Number` | |
| easing | `String` | |
| duration | `Number` | |
| complete | `Function` | Callback |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/scroll is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/scroll project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
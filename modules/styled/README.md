# Styled

[![npm package](https://img.shields.io/npm/v/@pluginjs/styled.svg)](https://www.npmjs.com/package/@pluginjs/styled)

`styled` is a utility JavaScript library for control dom inline-style.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/styled
```

#### NPM

```javascript
npm i @pluginjs/styled
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/styled/dist/styled.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/styled/dist/styled.min.js"></script>
```

## API

### setStyle

Parameters

| Name | Type | Description |
|||-|
| style | `StyleSheet` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### outerHeight

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| outerHeight | `Number` | |

### outerHeightWithMargin

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| outerHeightWithMargin | `Number` | |

### outerWidth

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| outerWidth | `Number` | |

### outerWidthWithMargin

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| outerWidthWithMargin | `Number` | |

### getStyle

Parameters

| Name | Type | Description |
|||-|
| attribute | `String` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| style | `String` | |

### innerHeight

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| innerHeight | `Number` | |

### innerWidth

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| innerWidth | `Number` | |

### getWidth

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| getWidth | `Number` | |

### getHeight

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| getWidth | `Number` | |

### offset

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| offset | `{ top: String, left: String }` | |

### css

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |
| style | `StyleSheet` | |

Returns

| Name | Type | Description |
|||-|
| styleValue | `String` | |

### hideElement

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### showElement

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/styled is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/styled project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
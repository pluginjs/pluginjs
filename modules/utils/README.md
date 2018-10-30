# Utils

[![npm package](https://img.shields.io/npm/v/@pluginjs/utils.svg)](https://www.npmjs.com/package/@pluginjs/utils)

`utils` is a utility JavaScript library.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/utils
```

#### NPM

```javascript
npm i @pluginjs/utils
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/utils/dist/utils.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/utils/dist/utils.min.js"></script>
```

## API

### deepClone

Parameters

| Name | Type | Description |
|||-|
| obj | `Object` | |

Returns

| Name | Type | Description |
|||-|
| obj | `Object` | |

### nub

Parameters

| Name | Type | Description |
|||-|
| arr | `Array` | |

Returns

| Name | Type | Description |
|||-|
| arr | `Array` | |

### isPlainObject

Parameters

| Name | Type | Description |
|||-|
| data | `Object` | |

Returns

| Name | Type | Description |
|||-|
| isPlainObject | `Boolean` | |

### deepMerge

Parameters

| Name | Type | Description |
|||-|
| x | `Object` | |
| y | `Object` | |

Returns

| Name | Type | Description |
|||-|
| result | `Object` | |

### curry

Parameters

| Name | Type | Description |
|||-|
| fn | `Function` | |

Returns

| Name | Type | Description |
|||-|
| fn | `Function` | |

### compose

Parameters

| Name | Type | Description |
|||-|
| fn | `Function[]` | |

Returns

| Name | Type | Description |
|||-|
| callback | `Function` | |

### getUID

Parameters

| Name | Type | Description |
|||-|
| prefix | `String` | |

Returns

| Name | Type | Description |
|||-|
| uid | `String` | |

### range

Parameters

| Name | Type | Description |
|||-|
| v | `Number` | length |

Returns

| Name | Type | Description |
|||-|
| result | `Array` | |

### reflow

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| offsetHeight | `Number` | |

### arrayEqual

Parameters

| Name | Type | Description |
|||-|
| a | `Array` | |
| b | `Array` | |

Returns

| Name | Type | Description |
|||-|
| isEqual | `Boolean` | |

### arrayDiff

Parameters

| Name | Type | Description |
|||-|
| a | `Array` | |
| b | `Array` | |

Returns

| Name | Type | Description |
|||-|
| diff | `Array` | |

### arrayIntersect

Parameters

| Name | Type | Description |
|||-|
| a | `Array` | |
| b | `Array` | |

Returns

| Name | Type | Description |
|||-|
| intersect | `Array` | |

### convertPercentageToFloat

Parameters

| Name | Type | Description |
|||-|
| percentage | `String` | |

Returns

| Name | Type | Description |
|||-|
| float | `Float` | |

### convertFloatToPercentage

Parameters

| Name | Type | Description |
|||-|
| float | `Float` | |

Returns

| Name | Type | Description |
|||-|
| percentage | `String` | |

### convertMatrixToArray

Parameters

| Name | Type | Description |
|||-|
| matrix | `String` | |

Returns

| Name | Type | Description |
|||-|
| array | `Array` | |

### getTime

Returns

| Name | Type | Description |
|||-|
| dateNow | `Number` | |

### camelize

Parameters

| Name | Type | Description |
|||-|
| word | `String` | |
| first | `Boolean` | |

Returns

| Name | Type | Description |
|||-|
| word | `String` | |

### getValueByPath

Parameters

| Name | Type | Description |
|||-|
| obj | `Object` | |
| path | `String` | |

Returns

| Name | Type | Description |
|||-|
| obj | `Object` | |

### throttle

Parameters

| Name | Type | Description |
|||-|
| func | `Function` | |
| delay | `Number` | |

Returns

| Name | Type | Description |
|||-|
| handler | `Function` | |

### debounce

Parameters

| Name | Type | Description |
|||-|
| func | `Function` | |
| delay | `Number` | |

Returns

| Name | Type | Description |
|||-|
| handler | `Function` | |

### fromPairs

Parameters

| Name | Type | Description |
|||-|
| arr | `Array` | |

Returns

| Name | Type | Description |
|||-|
| obj | `Object` | |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/utils is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/utils project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
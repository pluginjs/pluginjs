# Dom

[![npm package](https://img.shields.io/npm/v/@pluginjs/dom.svg)](https://www.npmjs.com/package/@pluginjs/dom)

`dom` is a utility JavaScript library for control dom interfaces.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/dom
```

#### NPM

```javascript
npm i @pluginjs/dom
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/dom/dist/dom.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/dom/dist/dom.min.js"></script>
```

## API

### query

Alias: parentNode.querySelector

Parameters

| Name | Type | Description |
|||-|
| selector | `String` | CSS selectors |
| parent | `HTMLElement` | Default: `document` |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | An Element object representing the first element in the document that matches the specified set of CSS selectors, or null is returned if there are no matches. |

### queryAll

Alias: parentNode.querySelectorAll

Parameters

| Name | Type | Description |
|||-|
| selector | `String` | CSS selectors |
| parent | `HTMLElement` | Default: `document` |

Returns

| Name | Type | Description |
|||-|
| elements | `Array<HTMLElement>` | A non-live Array containing one Element object for each element that matches at least one of the specified selectors or an empty Array in case of no matches. |

### find

Just like query, but it is Curried.

### finds

Just like queryAll, but it is Curried.

### remove

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### html

Parameters

| Name | Type | Description |
|||-|
| content | `String` | html string |
| element | `HTMLElement` | container |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | container |

### children

Parameters

| Name | Type | Description |
|||-|
| selector | `String` | CSS selectors |
| parent | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| elements | `Array<HTMLElement>` | a Array which contains all of the child elements that matches the specified set of CSS selectors .  |

### siblings

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### parent

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | parentNode |

### parseHTML

Support tagged template.

Parameters

| Name | Type | Description |
|||-|
| htmlString | `String` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### setData

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |
| value | `Any` | |
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### getData

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### clone

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### empty

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### prev

Alias: node.previousElementSibling

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### next

Alias: node.nextElementSibling

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### attr

Parameters

| Name | Type | Description |
|||-|
| args | `String | Object` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### removeAttr

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### data

Parameters

| Name | Type | Description |
|||-|
| args | `String | Object` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### text

Parameters

| Name | Type | Description |
|||-|
| content | `String` | textContent |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### append

Parameters

| Name | Type | Description |
|||-|
| child | `HTMLElement` | childNode |
| el | `HTMLElement` | parentNode |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | parentNode |

### prepend

Parameters

| Name | Type | Description |
|||-|
| child | `HTMLElement` | childNode |
| el | `HTMLElement` | parentNode |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | parentNode |

### insertBefore

Parameters

| Name | Type | Description |
|||-|
| newElement | `HTMLElement` | new element |
| el | `HTMLElement` | parentNode |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | parentNode |

### insertAfter

Parameters

| Name | Type | Description |
|||-|
| newElement | `HTMLElement` | new element |
| el | `HTMLElement` | parentNode |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | parentNode |

### wrap

Parameters

| Name | Type | Description |
|||-|
| wrapElement | `HTMLElement` | wrapper |
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| wrapElement | `HTMLElement` | wrapper |

### wrapInner

Parameters

| Name | Type | Description |
|||-|
| newElement | `HTMLElement` | new element |
| wrap | `HTMLElement` | wrapper |

Returns

| Name | Type | Description |
|||-|
| wrap | `HTMLElement` | wrapper |

### wrapAll

Parameters

| Name | Type | Description |
|||-|
| wrapElement | `HTMLElement` | wrapper |
| elementList | `Array<HTMLElement>` | |

Returns

| Name | Type | Description |
|||-|
| wrapElement | `HTMLElement` | wrapper |

### unwrap

Parameters

| Name | Type | Description |
|||-|
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | |

### parentWith

Parameters

| Name | Type | Description |
|||-|
| fn | `HTMLElement => Boolean` | |
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | parentNode |

### clearData

Parameters

| Name | Type | Description |
|||-|
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| el | `HTMLElement` | |

### contains

Parameters

| Name | Type | Description |
|||-|
| el | `HTMLElement` | |
| parent | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| bool | `Boolean` | |

### closest

Parameters

| Name | Type | Description |
|||-|
| selector | `String` | |
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| parentElement | `HTMLElement` | |

### nextWith

Parameters

| Name | Type | Description |
|||-|
| fn | `HTMLElement => Boolean` | |
| el | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| nextElement | `HTMLElement` | |

### fade

Parameters

| Name | Type | Description |
|||-|
| type | `String` | |
| Options | `{ duration: Number, callback: Function }` | |
| element | `HTMLElement` |

Returns

| Name | Type | Description |
|||-|
| nextElement | `HTMLElement` | |

### fadeOut

Parameters

| Name | Type | Description |
|||-|
| Options | `{ duration: Number, callback: Function }` | |
| element | `HTMLElement` |

Returns

| Name | Type | Description |
|||-|
| nextElement | `HTMLElement` | |

### fadeIn

Parameters

| Name | Type | Description |
|||-|
| Options | `{ duration: Number, callback: Function }` | |
| element | `HTMLElement` |

Returns

| Name | Type | Description |
|||-|
| nextElement | `HTMLElement` | |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/dom is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/dom project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
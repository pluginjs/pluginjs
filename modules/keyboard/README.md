# Keyboard

[![npm package](https://img.shields.io/npm/v/@pluginjs/keyboard.svg)](https://www.npmjs.com/package/@pluginjs/keyboard)

`keyboard` is a utility JavaScript library for keyboard event.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/keyboard
```

#### NPM

```javascript
npm i @pluginjs/keyboard
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/keyboard/dist/keyboard.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/keyboard/dist/keyboard.min.js"></script>
```

## API

### registerEvent

mount `keydown` `keyup` event listener on `this.element`.

### handler

Parameters

| Name | Type | Description |
|||-|
| e | `Event` | |

### on

Parameters

| Name | Type | Description |
|||-|
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|||-|
| instance | `Object` | this |

### off

Parameters

| Name | Type | Description |
|||-|
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|||-|
| instance | `Object` | this |

### dispatch

Parameters

| Name | Type | Description |
|||-|
| toggle | `Boolean` | |
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|||-|
| instance | `Object` | this |

### parseKeys

Parameters

| Name | Type | Description |
|||-|
| keys | `String[]` | |

Returns

| Name | Type | Description |
|||-|
| newKeys | `String[]` | |

### processKey

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |

Returns

| Name | Type | Description |
|||-|
| newKeys | `String[]` | |

### processModifiers

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |

Returns

| Name | Type | Description |
|||-|
| modifiers | `Function[]` | |

### distribute

Parameters

| Name | Type | Description |
|||-|
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|||-|
| instance | `Object` | this |

### getKeyName

Parameters

| Name | Type | Description |
|||-|
| keyCode | `String` | |

Returns

| Name | Type | Description |
|||-|
| keyName | `String` | |

### getKeyCode

Parameters

| Name | Type | Description |
|||-|
| keyName | `String` | |

Returns

| Name | Type | Description |
|||-|
| keyCode | `String` | |

### up

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|||-|
| instance | `Object` | this |

### down

Parameters

| Name | Type | Description |
|||-|
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|||-|
| instance | `Object` | this |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/keyboard is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/keyboard project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
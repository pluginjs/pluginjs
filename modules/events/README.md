# Events

[![npm package](https://img.shields.io/npm/v/@pluginjs/events.svg)](https://www.npmjs.com/package/@pluginjs/events)

`events` is a utility JavaScript library for dom event interface.

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/events
```

#### NPM

```javascript
npm i @pluginjs/events
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/events/dist/events.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/events/dist/events.min.js"></script>
```

## API

### trigger

Parameters

| Name | Type | Description |
|||-|
| event | `String or CustomEvent` | evnetName or customEvent |
| [ extraParams ] | `String or PlainObject` | one or more or null |
| element | `HTMLElement` | |

### bindEvent

Parameters

| Name | Type | Description |
|||-|
| events | `String` | One or more space-separated event types and optional namespaces |
| [ selector ] | `String` | |
| callback | `Function` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### removeEvent

Parameters

| Name | Type | Description |
|||-|
| events | `String` | One or more space-separated event types and optional namespaces |
| [ selector ] | `String` | |
| callback | `Function` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### bindEventOnce

Parameters

| Name | Type | Description |
|||-|
| events | `String` | One or more space-separated event types and optional namespaces |
| [ selector ] | `String` | |
| callback | `Function` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

### getEventEmitter

Parameters

| Name | Type | Description |
|||-|
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|||-|
| eventEmitter | `EventEmitter` | |

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/events is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/events project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
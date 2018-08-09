# Viewport

[![npm package](https://img.shields.io/npm/v/@pluginjs/viewport.svg)](https://www.npmjs.com/package/@pluginjs/viewport)

`viewport` is a utility JavaScript library to control viewport.

---

## Usage

```Javascript
import viewport from '@pluginjs/viewport'

const observer = viewport(el, options)

// eventName: String = enter | exit
observer.on(eventName, handler, this)
observer.off(eventName, handler)
```

## API

### on

Parameters

| Name | Type | Description |
|------|------|-------------|
| eventName | `String` | |
| func | `Function` | handler |
| instance | `Object` | instance |

### off

Parameters

| Name | Type | Description |
|------|------|-------------|
| eventName | `String` | |
| func | `Function` | handler |

### eventMapper

Parameters

| Name | Type | Description |
|------|------|-------------|
| eventName | `String` | |
| func | `Function` | handler |

### isVisible

Returns

| Name | Type | Description |
|------|------|-------------|
| isIntersecting | `Boolean` | |

## Tip

JSDom do not support Intersection Observer, please require the [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).

Usage

```sh
yarn workspace xxx add intersection-observer -D
```

```javascript
// in xxx.spec.js
import 'intersection-observer'
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/viewport is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/viewport project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
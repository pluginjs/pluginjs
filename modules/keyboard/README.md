# Keyboard

[![npm package](https://img.shields.io/npm/v/@pluginjs/keyboard.svg)](https://www.npmjs.com/package/@pluginjs/keyboard)

`keyboard` is a utility JavaScript library for keyboard event.

---

## API

### registerEvent

mount `keydown` `keyup` event listener on `this.element`.

### handler

Parameters

| Name | Type | Description |
|------|------|-------------|
| e | `Event` | |

### on

Parameters

| Name | Type | Description |
|------|------|-------------|
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| instance | `Object` | this |

### off

Parameters

| Name | Type | Description |
|------|------|-------------|
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| instance | `Object` | this |

### dispatch

Parameters

| Name | Type | Description |
|------|------|-------------|
| toggle | `Boolean` | |
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| instance | `Object` | this |

### parseKeys

Parameters

| Name | Type | Description |
|------|------|-------------|
| keys | `String[]` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| newKeys | `String[]` | |

### processKey

Parameters

| Name | Type | Description |
|------|------|-------------|
| key | `String` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| newKeys | `String[]` | |

### processModifiers

Parameters

| Name | Type | Description |
|------|------|-------------|
| key | `String` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| modifiers | `Function[]` | |

### distribute

Parameters

| Name | Type | Description |
|------|------|-------------|
| action | `String` | |
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| instance | `Object` | this |

### getKeyName

Parameters

| Name | Type | Description |
|------|------|-------------|
| keyCode | `String` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| keyName | `String` | |

### getKeyCode

Parameters

| Name | Type | Description |
|------|------|-------------|
| keyName | `String` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| keyCode | `String` | |

### up

Parameters

| Name | Type | Description |
|------|------|-------------|
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| instance | `Object` | this |

### down

Parameters

| Name | Type | Description |
|------|------|-------------|
| key | `String` | |
| func | `Function` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| instance | `Object` | this |

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/keyboard is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/keyboard project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
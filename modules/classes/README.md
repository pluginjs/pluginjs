# Classes

[![npm package](https://img.shields.io/npm/v/@pluginjs/classes.svg)](https://www.npmjs.com/package/@pluginjs/classes)

`classes` is a utility JavaScript library for control class interfaces.

---

## API

### addClass

Add specified class values. If these classes already exist in attribute of the element, then they are ignored.

Parameters

| Name | Type | Description |
|------|------|-------------|
| className | `String[]` | function rest parameter |

Returns

| Name | Type | Description |
|------|------|-------------|
| element | `HTMLElement` | |

### removeClass

Remove specified class values.

Parameters

| Name | Type | Description |
|------|------|-------------|
| className | `String[]` | function rest parameter |

Returns

| Name | Type | Description |
|------|------|-------------|
| element | `HTMLElement` | |

### indexOfClass

Return class value by index in collection.

Parameters

| Name | Type | Description |
|------|------|-------------|
| className | `String` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| index | `Number` | index of class |

### hasClass

Checks if specified class value exists in class attribute of the element.

Parameters

| Name | Type | Description |
|------|------|-------------|
| className | `String` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| hasClass | `Boolean` | |

### toggleClass

Toggle class value; i.e., if class exists then remove it and return false, if not, then add it and return true.

Parameters

| Name | Type | Description |
|------|------|-------------|
| className | `String` | |
| element | `HTMLElement` | |

Returns

| Name | Type | Description |
|------|------|-------------|
| element | `HTMLElement` | |

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/classes is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/classes project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
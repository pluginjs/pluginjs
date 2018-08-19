# SimpleEmitter

[![npm package](https://img.shields.io/npm/v/@pluginjs/simple-emitter.svg)](https://www.npmjs.com/package/@pluginjs/simple-emitter)

`simple-emitter` is a utility JavaScript library for event emitter.

---

## API

### emit

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| args | Any[] | args for handler |

Returns

| Name | Type | Description |
|------|------|-------------|
| Ok | `Boolean` | |

### on

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| listener | Function | handler |
| context | Object | this |
| priority | Number | priority level |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### once

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| listener | Function | handler |
| context | Object | this |
| priority | Number | priority level |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### off

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| listener | Function | handler |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### addListener

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| listener | Function | handler |
| context | Object | this |
| priority | Number | priority level |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### addListenerOnce

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| listener | Function | handler |
| context | Object | this |
| priority | Number | priority level |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### removeListener

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |
| listener | Function | handler |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### removeAllListeners

Parameters

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### ensureListener

Parameters

| Name | Type | Description |
|------|------|-------------|
| listener | Function | handler |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### hasListeners

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |

Returns

| Name | Type | Description |
|------|------|-------------|
| this | `Object` | Instance |

### getListeners

Parameters

| Name | Type | Description |
|------|------|-------------|
| event | String | event name |

Returns

| Name | Type | Description |
|------|------|-------------|
| listeners | `Array` | |

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/simple-emitter is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/simple-emitter project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
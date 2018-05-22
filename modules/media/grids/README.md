# Grids
> A flexible modern grids js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/grids
```
#### NPM
```javascript
npm i @pluginjs/grids
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import grids from "@pluginjs/grids"
```

CommonJS
```javascript
require("@pluginjs/grids")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/grids.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/grids.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/grids.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/grids.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
JS:
```javascript
Pj.grids('.element', options);
```
---
## API

### Options:
Options are called on grids instances through the grids options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"wrapSelector"` | Set wrapSelector | `null`
`"itemSelector"` | Set itemSelector | `null`
`"model"` | Set model | `grid`
`"maxColumn"` | Set the max column number | `5`
`"gutter"` | Set gutter | `0`
`"minHeight"` | Set minHeight | `150`
`"minWidth"` | Set minWidth | `200`
`"delay"` | Set delay | `60`
`"duration"` | Set duretion | `800`
`"direction"` | Set direction | `topLeft`
`"filters"` | Set filters | `[]`
`"filterbar"` | Set filterbar | `{&quot;filters&quot;:false,&quot;sort&quot;:false,&quot;reverse&quot;:false}`
`"sortby"` | Set sortby | ``
`"sortDirection"` | Set sortDirection | `max`
`"carousel"` | Set carousel | `false`
`"animate"` | Set animate | `fadeInUp`
`"effects"` | Set effects | `{}`
`"nestedConfig"` | Set nestedConfig | `{&quot;width&quot;:100,&quot;height&quot;:100}`
`"sort"` | Set sort | `function() {...}`
`"parseTagsStr"` | Set parseTagsStr | `function() {...}`

### Events:
Events are called on grids instances through the grids events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"changed"` | Gets fired when plugin has changed
`"resized"` | Gets fired when plugin has resized
`"filter"` | Gets fired when plugin has filter
`"sort"` | Gets fired when plugin has sort
`"reverse"` | Gets fired when plugin has reverse

```
### Methods:
Methods are called on grids instances through the grids method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"value"` | Get value
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"filter"` | Make plugin filter
`"sort"` | Make plugin sort
`"reverse"` | Make plugin reverse

**example:**
```javascript
Pj.$grids('.element', value)
Pj.$grids('.element', value, "foo")
Pj.$grids('.element', value, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `as-grids`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"WRAP"` | Declare plugin wrap | `{namespace}-wrap`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"FILTERBAR"` | Declare plugin filterbar | `{namespace}-filterbar`
`"FILTERS"` | Declare plugin filterbar filters | `{namespace}-filterbar-filters`
`"SORT"` | Declare plugin filterbar sort | `{namespace}-filterbar-sort`
`"REVERSE"` | Declare plugin filterbar reverse | `{namespace}-filterbar-reverse`
`"REVERSEMIN"` | Declare plugin filterbar reverse min | `{namespace}-filterbar-reverse-min`
`"CHUNK"` | Declare plugin chunk | `{namespace}-chunk`
`"HIDE"` | Declare plugin hide | `{namespace}-hide`
`"GRIDMODEL"` | Declare plugin grid model | `{namespace}-grid-model`
`"MASONRYMODEL"` | Declare plugin masonry model | `{namespace}-masonry-model`
`"JUSTIFIEDMODEL"` | Declare plugin justified model | `{namespace}-justified-model`
`"NESTEDMODEL"` | Declare plugin nested model | `{namespace}-nested-model`
`"CAROUSEL"` | Declare plugin carousel | `{namespace}-carousel`
`"CAROUSELPREV"` | Declare plugin carousel prev | `{namespace}-carousel-prev`
`"CAROUSELNEXT"` | Declare plugin carousel next | `{namespace}-carousel-next`
`"CAROUSELDOTS"` | Declare plugin carousel dots | `{namespace}-carousel-dots`
`"DRAG"` | Declare plugin drag | `{namespace}-drag`



### Dependencies:
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`
- `[object Object]`

---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/plugin/plugin.js/releases).

## Version
Version: 0.2.22

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
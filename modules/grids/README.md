# Grids

[![npm package](https://img.shields.io/npm/v/@pluginjs/grids.svg)](https://www.npmjs.com/package/@pluginjs/grids)

A flexible modern grids js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/grids/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/grids
```

#### NPM

```javascript
npm i @pluginjs/grids
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/grids/dist/grids.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/grids/dist/grids.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/grids/dist/grids.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/grids/dist/grids.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import Grids from "@pluginjs/grids"
import "@pluginjs/grids/dist/grids.css"

Grids.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/grids/dist/grids.css")
const Grids = require("@pluginjs/grids")

Grids.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/grids/dist/grids.css">
<script src="https://unpkg.com/@pluginjs/grids/dist/grids.js"></script>
<script>
  Pj.grids('.element', options)
</script>
```

## API

### Options

Options are called on grids instances through the grids options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
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
`"filterbar"` | Set filterbar | `{"filters":false,"sort":false,"reverse":false}`
`"sortby"` | Set sortby | ``
`"sortDirection"` | Set sortDirection | `max`
`"carousel"` | Set carousel | `false`
`"animate"` | Set animate | `fadeInUp`
`"effects"` | Set effects | `{}`
`"nestedConfig"` | Set nestedConfig | `{"width":100,"height":100}`
`"sort"` | Set sort | `function() {...}`
`"parseTagsStr"` | Set parseTagsStr | `function() {...}`

### Events

Events are called on grids instances through the grids events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"changed"` | Gets fired when plugin has changed
`"resized"` | Gets fired when plugin has resized
`"filter"` | Gets fired when plugin has filter
`"sort"` | Gets fired when plugin has sort
`"reverse"` | Gets fired when plugin has reverse

### Methods

Methods are called on grids instances through the grids method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"value"` | Get value
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"filter"` | Make plugin filter
`"sort"` | Make plugin sort
`"reverse"` | Make plugin reverse

### Classes

Name | Description | Default
--||
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

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/grids is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/grids project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2022 [Creation Studio Limited](creationstudio.com).
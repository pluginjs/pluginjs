# Strength
> A flexible modern strength js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### Yarn
```javascript
yarn add @pluginjs/strength
```
#### NPM
```javascript
npm i @pluginjs/strength
```
---

## Getting Started
### Include
**Webpack && Rollup:**

ECMAScript Modules
```javascript
import strength from "@pluginjs/strength"
```

CommonJS
```javascript
require("@pluginjs/strength")
```

**CDN:**
Development:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/strength.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/strength.css">
```
Production:
```html
<script src="https://unpkg.com/@pluginjs/{moduleName}/dist/strength.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{moduleName}/dist/strength.min.css">
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
Pj.strength('.element', options);
```
---
## API

### Options:
Options are called on strength instances through the strength options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"theme"` | Set plugin theme option | `null`
`"showMeter"` | rendering meter | `true`
`"showToggle"` | rendering toggle | `true`
`"usernameField"` | Set plugin usernameField option | ``
`"templates"` | Set default templates | `{&quot;toggle&quot;:&quot;&lt;span class&#x3D;\&quot;input-group-addon\&quot;&gt;&lt;input type&#x3D;\&quot;checkbox\&quot; class&#x3D;\&quot;{classes.TOGGLE}\&quot; title&#x3D;\&quot;{label}\&quot; /&gt;&lt;/span&gt;&quot;,&quot;meter&quot;:&quot;&lt;div class&#x3D;\&quot;{classes.METER}\&quot;&gt;{score}&lt;/div&gt;&quot;,&quot;score&quot;:&quot;&lt;span class&#x3D;\&quot;label {classes.SCORE}\&quot;&gt;&lt;/span&gt;&quot;,&quot;main&quot;:&quot;&lt;div class&#x3D;\&quot;{classes.CONTAINER}\&quot;&gt;&lt;div class&#x3D;\&quot;input-group\&quot;&gt;{input}{toggle}&lt;/div&gt;{meter}&lt;/div&gt;&quot;}`
`"scoreLables"` | Set plugin scoreLables option | `{&quot;empty&quot;:&quot;Empty&quot;,&quot;invalid&quot;:&quot;Invalid&quot;,&quot;weak&quot;:&quot;Weak&quot;,&quot;good&quot;:&quot;Good&quot;,&quot;strong&quot;:&quot;Strong&quot;}`
`"scoreClasses"` | Set plugin scoreClasses option | `{&quot;empty&quot;:&quot;&quot;,&quot;invalid&quot;:&quot;label-danger&quot;,&quot;weak&quot;:&quot;label-warning&quot;,&quot;good&quot;:&quot;label-info&quot;,&quot;strong&quot;:&quot;label-success&quot;}`
`"emptyStatus"` | Set plugin emptyStatus option | `true`
`"scoreCallback"` | Set plugin scoreCallback option | `null`
`"statusCallback"` | Set plugin statusCallback option | `null`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set plugin is  localeFallbacks or not | `true`

### Events:
Events are called on strength instances through the strength events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"update"` | Gets fired when plugin has destroy
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"check"` | Gets fired when plugin has check
`"statusChange"` | Gets fired when plugin has statusChange
`"toggle"` | Gets fired when plugin has toggle

```
### Methods:
Methods are called on strength instances through the strength method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"getScore"` | Get score
`"getStatus"` | Get status
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

**example:**
```javascript
Pj.$strength('.element', getScore)
Pj.$strength('.element', getScore, "foo")
Pj.$strength('.element', getScore, "foo", "bar")
```

### Classes:
Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-strength`
`"THEME"` | Declare plugin theme | `{namespace}-{theme}`
`"CONTAINER"` | Declare plugin range | `{namespace}-container`
`"STATUS"` | Declare plugin status | `{namespace}-{status}`
`"INPUT"` | Declare plugin input | `{namespace}-input`
`"TOGGLE"` | Declare plugin toggle | `{namespace}-toggle`
`"METER"` | Declare plugin meter | `{namespace}-meter`
`"SCORE"` | Declare plugin score | `{namespace}-score`
`"SHOWN"` | Declare plugin shown | `{namespace}-shown`


### Translations:
Name | EN | ZH
-----|------|-------
`"Empty"` | Empty | 空
`"Invalid"` | Invalid | 无效
`"Weak"` | Weak | 弱
`"Good"` | Good | 中
`"Strong"` | Strong | 强
`"toggle"` | Show/Hide Password | 显示/隐藏 密码


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
Version: 0.2.19

## Copyright and license
Copyright (C) 2018 Creation Studio Limited.

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.
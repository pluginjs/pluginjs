# {{Namespace}}

[![npm package](https://img.shields.io/npm/v/@pluginjs/{{moduleName}}.svg)](https://www.npmjs.com/package/@pluginjs/{{moduleName}})

A flexible modern {{moduleName}} js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/{{namespace}}/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/{{moduleName}}
```

#### NPM

```javascript
npm i @pluginjs/{{moduleName}}
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/{{moduleName}}/dist/{{moduleName}}.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{{moduleName}}/dist/{{moduleName}}.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/{{moduleName}}/dist/{{moduleName}}.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{{moduleName}}/dist/{{moduleName}}.min.css">
```

### Initialize

HTML:

```html
<body>
  <div class="element"></div>
</body>
```

ECMAScript Module:

```javascript
import {{Namespace}} from "@pluginjs/{{moduleName}}"
import "@pluginjs/{{moduleName}}/dist/{{moduleName}}.css"

{{Namespace}}.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/{{moduleName}}/dist/{{moduleName}}.css")
const {{Namespace}} = require("@pluginjs/{{moduleName}}")

{{Namespace}}.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/{{moduleName}}/dist/{{moduleName}}.css">
<script src="https://unpkg.com/@pluginjs/{{moduleName}}/dist/{{moduleName}}.js"></script>
<script>
  Pj.{{namespace}}('.element', options)
</script>
```

---

## API

{{#if options}}
### Options

Options are called on {{namespace}} instances through the {{namespace}} options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
{{#each options}}
{{#with this}}
`"{{name}}"` | {{desc}} | `{{defaultValue}}`
{{/with}}
{{/each}}
{{/if}}
{{#if events}}

### Events

Events are called on {{namespace}} instances through the {{namespace}} events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
{{#each events}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}
{{/if}}
{{#if methods}}

### Methods

Methods are called on {{namespace}} instances through the {{namespace}} method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
{{#each methods}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}
{{/if}}
{{#if classes}}

### Classes

Name | Description | Default
-----|------|------
{{#each classes}}
{{#with this}}
`"{{name}}"` | {{desc}} | `{{value}}`
{{/with}}
{{/each}}
{{/if}}
{{#if translations}}

### Translations

Name | EN | ZH
-----|------|-------
{{#each translations}}
{{#with this}}
`"{{name}}"` | {{en}} | {{zh}}
{{/with}}
{{/each}}
{{/if}}
---

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/{{moduleName}} is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/{{moduleName}} project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
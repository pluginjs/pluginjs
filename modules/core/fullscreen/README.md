# [jQuery fullscreen](https://github.com/amazingSurge/jquery-fullscreen) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jQuery fullscreen that do amazing things.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-fullscreen.js
├── jquery-fullscreen.min.js
└── css/
    ├── fullscreen.css
    └── fullscreen.min.css
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-fullscreen/master/dist/jquery-fullscreen.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-fullscreen/master/dist/jquery-fullscreen.min.js) - minified

#### Install From Bower
```sh
bower install jquery-fullscreen --save
```

#### Install From Npm
```sh
npm install jquery-fullscreen --save
```

#### Install From Yarn
```sh
yarn add jquery-fullscreen
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-fullscreen.git
cd jquery-fullscreen
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-fullscreen` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<link rel="stylesheet" href="/path/to/fullscreen.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-fullscreen.js"></script>
```

#### Required HTML structure

```html
<div class="example"></div>
```

#### Initialization
All you need to do is call the fullscreen on the element:

```javascript
jQuery(function($) {
  $('.example').fullscreen();
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-fullscreen/tree/master/examples).

## Options
`jquery-fullscreen` can accept an options object to alter the way it behaves. You can see the default options by call `$.fullscreen.setDefaults()`. The structure of an options object is as follows:

```
{
  
}
```

## Methods
Methods are called on fullscreen instances through the fullscreen method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().fullscreen('enable');

// or
var api = $().data('fullscreen');
api.enable();
```

#### get()
Get the value.
```javascript
var icon = $().fullscreen('get');
```

#### set()
Set the value.
```javascript
$().fullscreen('set', 'value');
```

#### val()
Get or set the value.
```javascript
// get the value
var value = $().fullscreen('val'); 

// set the value
$().fullscreen('set', 'value');
```

#### enable()
Enable the fullscreen functions.
```javascript
$().fullscreen('enable');
```

#### disable()
Disable the fullscreen functions.
```javascript
$().fullscreen('disable');
```

#### destroy()
Destroy the fullscreen instance.
```javascript
$().fullscreen('destroy');
```

## Events
`jquery-fullscreen` provides custom events for the fullscreen’s unique actions. 

```javascript
$('.example').on('fullscreen::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
enable  | Fired when the `enable` instance method has been called.
disable | Fired when the `disable` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other fullscreen with the same namespace, just call the `$.fullscreen.noConflict` method to revert to it.

```html
<script src="other-fullscreen.js"></script>
<script src="jquery-fullscreen.js"></script>
<script>
  $.fullscreen.noConflict();
  // Code that uses other fullscreen's "$().fullscreen" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery fullscreen, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-fullscreen` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-fullscreen` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-fullscreen/releases).

## Copyright and license
Copyright (C) 2017 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-fullscreen.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-fullscreen/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-fullscreen.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-fullscreen
[license]: https://img.shields.io/npm/l/jquery-fullscreen.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-fullscreen.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-fullscreen
# Breakpoints

[![npm package](https://img.shields.io/npm/v/@pluginjs/breakpoints.svg)](https://www.npmjs.com/package/@pluginjs/breakpoints)

`breakpoints` is a utility JavaScript library for breakpoints.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/breakpoints/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/breakpoints
```

#### NPM

```javascript
npm i @pluginjs/breakpoints
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/breakpoints/dist/breakpoints.js"></script>
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/breakpoints/dist/breakpoints.min.js"></script>
```

### Initialize

HTML:

ECMAScript Module:

```javascript
import Breakpoints from "@pluginjs/breakpoints"

Breakpoints();
```

CommonJS:

```javascript
const Breakpoints = require("@pluginjs/breakpoints")

Breakpoints();
```

Browser:

```html
<script src="https://unpkg.com/@pluginjs/breakpoints/dist/breakpoints.js"></script>
<script>
  Breakpoints();
</script>
```

## Defaults
It will use the bootstrap media query breakpoints by default:

```javascript
Breakpoints.defaults = {
    // Extra small devices (portrait phones, less than 576px)
    xs: {
        min: 0,
        max: 575
    },
    // Small devices (landscape phones, 576px and up)
    sm: {
        min: 576,
        max: 767
    },
    // Medium devices (tablets, 768px and up)
    md: {
        min: 768,
        max: 991
    },
    // Large devices (desktops, 992px and up)
    lg: {
        min: 992,
        max: 1199
    },
    // Extra large devices (large desktops, 1200px and up)
    xl: {
        min: 1200,
        max: Infinity
    }
};
```

You can set up your own breakpoints when initialize it:

```javascript
<script type="text/javascript">
    Breakpoints({
        mobile: {
            min: 0,
            max: 767
        },
        tablet: {
            min: 768,
            max: 991
        },
        destop: {
            min: 992,
            max: Infinity
        }
    });
</script>
```

## Methods
### is

Check if the current screen is a specific size.

```javascript
Breakpoints.is('xs'); // is current screen is xs size
Breakpoints.is('md+'); // is current screen is md size and larger
Breakpoints.is('sm-'); // is current screen is sm size and smaller
Breakpoints.is('sm-md'); // is current screen is between sm and md size
```

### get
Return the size object that you can operate it handily.

```javascript
// get size object
var sm = Breakpoints.get('sm');

// attach events
sm.on('enter', function(){
    // do something
});

// remove event handler
sm.off('enter');

// get min width
sm.min // 768

// get max width
sm.max // 991

// get media query
sm.media // "(min-width: 768px) and (max-width: 991px)"

// check if it's current size
sm.isMatched(); // true or false

// you can do in a chain
Breakpoints.get('sm').on({
    enter: function(){
    },
    leave: function(){
    }
});
```

### current
Return the current screen size object

```javascript
Breakpoints.current();
```

### on
Attach an event handler function for one or more events to the size

```javascript
Breakpoints.on('md', {
    enter: function() {
        console.info('enter '+ this.name);
    },
    leave: function() {
        console.info('leave '+ this.name);
    }
});

Breakpoints.on('lg', 'enter', function(){
    console.info('hello lg');
});
```

#### Passing data to the callback

```javascript
Breakpoints.on('sm', 'enter', {
    name: "Addy"
}, function(data) {
    console.info(data.name + ' enter '+ this.name);
});

Breakpoints.on('sm', 'leave', {
    name: "Karl"
}, function(data) {
    console.info(data.name + ' leave '+ this.name);
});
```

### one
The handler attached to the size will executed at most once.

```javascript
Breakpoints.one('md', 'enter', function(){
    console.info('this only appear once when enter md');
});
```

### off
Remove event handlers attached to size.

```javascript
// remove all events attached to sm size
Breakpoints.off('sm');

// remove all enter type events attached to md size
Breakpoints.off('md', 'enter'); 

// remove specific event handler
var enterHandler = function(){};
Breakpoints.on('lg', 'enter', enterHandler);

Breakpoints.off('lg', {
    enter: enterHandler
})

// alternative way
Breakpoints.off('lg', 'enter', enterHandler);
```

### change
Attach an event handler to the size change event

```javascript
// attach handler to change event
Breakpoints.on('change', function(){
    console.info('enter ' + this.current.name);
});

// altrnative example
var changeHandler = function(){
    // do something 
};
Breakpoints.on('change', changeHandler);

// remove the handler
Breakpoints.off('change', changeHandler);

// remove all change handlers
Breakpoints.off('change');
```

### At
Attach an event handler function for the screen at a specific size

```javascript
Breakpoints.at('md', {
    enter: function() {
        console.info('enter '+ this.name);
    },
    leave: function() {
        console.info('leave '+ this.name);
    }
});

Breakpoints.at('md', 'enter', function(){
    console.info('enter '+ this.name);
});

Breakpoints.on('md', 'enter', function(){
    console.info('enter '+ this.name);
});

Breakpoints.off('md', 'enter');
```

### From
Attach an event handler function for the screen width is inside a specific size or larger

```javascript
Breakpoints.from('md', {
    enter: function() {
        console.info('enter md+');
    },
    leave: function() {
        console.info('leave md+');
    }
});

Breakpoints.from('md', 'enter', function(){
    console.info('enter md+');
});

Breakpoints.on('md+', 'enter', function(){
    console.info('enter md+');
});

Breakpoints.off('md+', 'enter');
```

### To
Attach an event handler function for the screen width is inside a specific size or smaller

```javascript
Breakpoints.to('md', {
    enter: function() {
        console.info('enter md-');
    },
    leave: function() {
        console.info('leave md-');
    }
});

Breakpoints.to('md', 'enter', function(){
    console.info('enter md-');
});

Breakpoints.on('md-', 'enter', function(){
    console.info('enter md-');
});

Breakpoints.off('md-', 'enter');
```

### Between
Attach an event handler function for the screen width is inside two specific size

```javascript
Breakpoints.between('md', 'lg', {
    enter: function() {
        console.info('enter md-lg');
    },
    leave: function() {
        console.info('leave md-lg');
    }
});

Breakpoints.between('md', 'lg', 'enter', function(){
    console.info('enter md-lg');
});

Breakpoints.on('md-lg', 'enter', function(){
    console.info('enter md-');
});

Breakpoints.off('md-lg', 'enter');
```

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/breakpoints is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/breakpoints project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
# Breakpoints

[![npm package](https://img.shields.io/npm/v/@pluginjs/breakpoints.svg)](https://www.npmjs.com/package/@pluginjs/breakpoints)

`breakpoints` is a utility JavaScript library for breakpoints.

---

## Usage

Before you try anything, you need to include breakpoints.js in your page.

```html
<script src="breakpoints.min.js"></script>
```

Then you can init the script easily by code 
```javascript
<script type="text/javascript">
    Breakpoints();
</script>
```

## Defaults
It will use the bootstrap media query breakpoints by default:

```javascript
Breakpoints.defaults = {
    // Extra small devices (phones)
    xs: {
        min: 0,
        max: 767
    },
    // Small devices (tablets)
    sm: {
        min: 768,
        max: 991
    },
    // Medium devices (desktops)
    md: {
        min: 992,
        max: 1199,
    },
    // Large devices (large desktops)
    lg: {
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
Breakpoints.is('xs'); // return true or false
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

#### Unite sizes

```javascript
Breakpoints.on('md lg', {
    enter: function() {
        console.info('enter '+ this.name);
    },
    leave: function() {
        console.info('leave '+ this.name);
    }
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

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/breakpoints is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/breakpoints project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).
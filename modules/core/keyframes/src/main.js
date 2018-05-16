/* eslint object-property-newline: 'off' */
const Keyframes = {
  bounce: [
    {
      transform: 'translate3d(0,0,0)',
      offset: 0
    },
    {
      transform: 'translate3d(0,0,0)',
      offset: 0.2
    },
    {
      transform: 'translate3d(0,-30px,0)',
      offset: 0.4
    },
    {
      transform: 'translate3d(0,-30px,0)',
      offset: 0.43
    },
    {
      transform: 'translate3d(0,0,0)',
      offset: 0.53
    },
    {
      transform: 'translate3d(0,-15px,0)',
      offset: 0.7
    },
    {
      transform: 'translate3d(0,0,0)',
      offset: 0.8
    },
    {
      transform: 'translate3d(0,-15px,0)',
      offset: 0.9
    },
    {
      transform: 'translate3d(0,0,0)',
      offset: 1
    }
  ],
  bounceIn: [
    {
      transform: 'scale3d(.3, .3, .3)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1)',
      offset: 0.2
    },
    {
      transform: 'scale3d(.9, .9, .9)',
      offset: 0.4
    },
    {
      transform: 'scale3d(1.03, 1.03, 1.03)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'scale3d(.97, .97, .97)',
      offset: 0.8
    },
    {
      transform: 'scale3d(1, 1, 1)',
      opacity: '1',
      offset: 1
    }
  ],
  bounceOut: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'scale3d(.9, .9, .9)',
      opacity: '1',
      offset: 0.2
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1)',
      opacity: '1',
      offset: 0.5
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1)',
      opacity: '1',
      offset: 0.55
    },
    {
      transform: 'scale3d(.3, .3, .3)',
      opacity: '0',
      offset: 1
    }
  ],
  bounceInDown: [
    {
      transform: 'translate3d(0, -3000px, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'translate3d(0, 25px, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'translate3d(0, -100px, 0)',
      offset: 0.75
    },
    {
      transform: 'translate3d(0, 5px, 0)',
      offset: 0.9
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  bounceOutDown: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'translate3d(0, 50px, 0)',
      opacity: '1',
      offset: 0.2
    },
    {
      transform: 'translate3d(0, -20px, 0)',
      opacity: '1',
      offset: 0.4
    },
    {
      transform: 'translate3d(0, -20px, 0)',
      opacity: '1',
      offset: 0.45
    },
    {
      transform: 'translate3d(0, 2000px, 0)',
      opacity: '0',
      offset: 1
    }
  ],
  bounceInUp: [
    {
      transform: 'translate3d(0, 3000px, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'translate3d(0, -25px, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'translate3d(0, 100px, 0)',
      offset: 0.75
    },
    {
      transform: 'translate3d(0, -5px, 0)',
      offset: 0.9
    },
    {
      transform: 'translate3d(0, 0, 0)',
      opacity: '1',
      offset: 1
    }
  ],
  bounceOutUp: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'translate3d(0, 50px, 0)',
      opacity: '1',
      offset: 0.2
    },
    {
      transform: 'translate3d(0, 20px, 0)',
      opacity: '1',
      offset: 0.4
    },
    {
      transform: 'translate3d(0, 20px, 0)',
      opacity: '1',
      offset: 0.45
    },
    {
      transform: 'translate3d(0, -2000px, 0)',
      opacity: '0',
      offset: 1
    }
  ],
  bounceInLeft: [
    {
      transform: 'translate3d(-3000px, 0, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'translate3d(25px, 0, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'translate3d(-100px, 0, 0)',
      offset: 0.75
    },
    {
      transform: 'translate3d(5px, 0, 0)',
      offset: 0.9
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  bounceOutLeft: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'translate3d(100px, 0, 0)',
      opacity: '1',
      offset: 0.2
    },
    {
      transform: 'translate3d(-20px, 0, 0)',
      opacity: '1',
      offset: 0.4
    },
    {
      transform: 'translate3d(-20px, 0, 0)',
      opacity: '1',
      offset: 0.45
    },
    {
      transform: 'translate3d(-2000px, 0, 0)',
      opacity: '0',
      offset: 1
    }
  ],
  bounceInRight: [
    {
      transform: 'translate3d(3000px, 0, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'translate3d(-25px, 0, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'translate3d(100px, 0, 0)',
      offset: 0.75
    },
    {
      transform: 'translate3d(-5px, 0, 0)',
      offset: 0.9
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  bounceOutRight: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'translate3d(100px, 0, 0)',
      opacity: '1',
      offset: 0.2
    },
    {
      transform: 'translate3d(-20px, 0, 0)',
      opacity: '1',
      offset: 0.4
    },
    {
      transform: 'translate3d(-20px, 0, 0)',
      opacity: '1',
      offset: 0.45
    },
    {
      transform: 'translate3d(2000px, 0, 0)',
      opacity: '0',
      offset: 1
    }
  ],
  flip: [
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)',
      offset: 0
    },
    {
      transform:
        'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)',
      offset: 0.4
    },
    {
      transform:
        'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)',
      offset: 0.5
    },
    {
      transform: 'perspective(400px) scale3d(.95, .95, .95)',
      offset: 0.8
    },
    {
      transform: 'perspective(400px)',
      offset: 1
    }
  ],
  flipInX: [
    {
      transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
      offset: 0.4
    },
    {
      transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
      opacity: '1',
      offset: 0.8
    },
    {
      transform: 'perspective(400px)',
      opacity: '1',
      offset: 1
    }
  ],
  flipOutX: [
    {
      transform: 'perspective(400px)',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
      opacity: '1',
      offset: 0.3
    },
    {
      transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
      opacity: '0',
      offset: 1
    }
  ],
  flipInY: [
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
      offset: 0.4
    },
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
      opacity: '1',
      offset: 0.8
    },
    {
      transform: 'perspective(400px)',
      opacity: '1',
      offset: 1
    }
  ],
  flipOutY: [
    {
      transform: 'perspective(400px)',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
      opacity: '1',
      offset: 0.3
    },
    {
      transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
      opacity: '0',
      offset: 1
    }
  ],
  flash: [
    {
      opacity: '1',
      offset: 0
    },
    {
      opacity: '0',
      offset: 0.25
    },
    {
      opacity: '1',
      offset: 0.5
    },
    {
      opacity: '0',
      offset: 0.75
    },
    {
      opacity: '1',
      offset: 1
    }
  ],
  pulse: [
    {
      transform: 'scale3d(1, 1, 1)',
      offset: 0
    },
    {
      transform: 'scale3d(1.05, 1.05, 1.05)',
      offset: 0.5
    },
    {
      transform: 'scale3d(1, 1, 1)',
      offset: 1
    }
  ],
  rubberBand: [
    {
      transform: 'scale3d(1, 1, 1)',
      offset: 0
    },
    {
      transform: 'scale3d(1.25, 0.75, 1)',
      offset: 0.3
    },
    {
      transform: 'scale3d(0.75, 1.25, 1)',
      offset: 0.4
    },
    {
      transform: 'scale3d(1.15, 0.85, 1)',
      offset: 0.5
    },
    {
      transform: 'scale3d(.95, 1.05, 1)',
      offset: 0.65
    },
    {
      transform: 'scale3d(1.05, .95, 1)',
      offset: 0.75
    },
    {
      transform: 'scale3d(1, 1, 1)',
      offset: 1
    }
  ],
  lightSpeedInRight: [
    {
      transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'skewX(20deg)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'skewX(-5deg)',
      opacity: '1',
      offset: 0.8
    },
    {
      transform: 'none',
      opacity: '1 ',
      offset: 1
    }
  ],
  lightSpeedOutRight: [
    {
      transform: 'none',
      opacity: '1 ',
      offset: 0
    },
    {
      transform: 'translate3d(100%, 0, 0) skewX(30deg)',
      opacity: '0',
      offset: 1
    }
  ],
  lightSpeedInLeft: [
    {
      transform: 'translate3d(-100%, 0, 0) skewX(-30deg)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'skewX(20deg)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'skewX(-5deg)',
      opacity: '1',
      offset: 0.8
    },
    {
      transform: 'none',
      opacity: '1 ',
      offset: 1
    }
  ],
  lightSpeedOutLeft: [
    {
      transform: 'none',
      opacity: '1 ',
      offset: 0
    },
    {
      transform: 'translate3d(-100%, 0, 0) skewX(30deg)',
      opacity: '0',
      offset: 1
    }
  ],
  shake: [
    {
      transform: 'translate3d(0, 0, 0)',
      offset: 0
    },
    {
      transform: 'translate3d(-10px, 0, 0)',
      offset: 0.1
    },
    {
      transform: 'translate3d(10px, 0, 0)',
      offset: 0.2
    },
    {
      transform: 'translate3d(-10px, 0, 0)',
      offset: 0.3
    },
    {
      transform: 'translate3d(10px, 0, 0)',
      offset: 0.4
    },
    {
      transform: 'translate3d(-10px, 0, 0)',
      offset: 0.5
    },
    {
      transform: 'translate3d(10px, 0, 0)',
      offset: 0.6
    },
    {
      transform: 'translate3d(-10px, 0, 0)',
      offset: 0.7
    },
    {
      transform: 'translate3d(10px, 0, 0)',
      offset: 0.8
    },
    {
      transform: 'translate3d(-10px, 0, 0)',
      offset: 0.9
    },
    {
      transform: 'translate3d(0, 0, 0)',
      offset: 1
    }
  ],
  swing: [
    {
      transform: 'translate(0%)',
      offset: 0
    },
    {
      transform: 'rotate3d(0, 0, 1, 15deg)',
      offset: 0.2
    },
    {
      transform: 'rotate3d(0, 0, 1, -10deg)',
      offset: 0.4
    },
    {
      transform: 'rotate3d(0, 0, 1, 5deg)',
      offset: 0.6
    },
    {
      transform: 'rotate3d(0, 0, 1, -5deg)',
      offset: 0.8
    },
    {
      transform: 'rotate3d(0, 0, 1, 0deg)',
      offset: 1
    }
  ],
  tada: [
    {
      transform: 'scale3d(1, 1, 1)',
      offset: 0
    },
    {
      transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
      offset: 0.1
    },
    {
      transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
      offset: 0.2
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
      offset: 0.3
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
      offset: 0.4
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
      offset: 0.5
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
      offset: 0.6
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
      offset: 0.7
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
      offset: 0.8
    },
    {
      transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
      offset: 0.9
    },
    {
      transform: 'scale3d(1, 1, 1)',
      offset: 1
    }
  ],
  wobble: [
    {
      transform: 'translate(0%)',
      offset: 0
    },
    {
      transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
      offset: 0.15
    },
    {
      transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
      offset: 0.45
    },
    {
      transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
      offset: 0.6
    },
    {
      transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
      offset: 0.75
    },
    {
      transform: 'translateX(0%)',
      offset: 1
    }
  ],
  fadeIn: [
    {
      opacity: '0',
      offset: 0
    },
    {
      opacity: '1',
      offset: 1
    }
  ],
  fadeOut: [
    {
      opacity: '1',
      offset: 0
    },
    {
      opacity: '0',
      offset: 1
    }
  ],
  fadeInDown: [
    {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeOutDown: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(0, 100%, 0)',
      offset: 1
    }
  ],
  fadeOutUp: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0)',
      offset: 1
    }
  ],
  fadeOutUpBig: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(0, -2000px, 0)',
      offset: 1
    }
  ],
  fadeInUp: [
    {
      opacity: '0',
      transform: 'translate3d(0, 100%, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeInDownBig: [
    {
      opacity: '0',
      transform: 'translate3d(0, -2000px, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeOutDownBig: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(0, 2000px, 0)',
      offset: 1
    }
  ],
  fadeInUpBig: [
    {
      opacity: '0',
      transform: 'translate3d(0, 2000px, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeInRightBig: [
    {
      opacity: '0',
      transform: 'translate3d(2000px, 0, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeOutLeftBig: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(-2000px, 0, 0)',
      offset: 1
    }
  ],
  fadeInLeft: [
    {
      opacity: '0',
      transform: 'translate3d(-100%, 0, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeInLeftBig: [
    {
      opacity: '0',
      transform: 'translate3d(-2000px, 0, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeInRight: [
    {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0)',
      offset: 0
    },
    {
      opacity: '1',
      transform: 'none',
      offset: 1
    }
  ],
  fadeOutLeft: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(-100%, 0, 0)',
      offset: 1
    }
  ],
  fadeOutRight: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(100%, 0, 0)',
      offset: 1
    }
  ],
  fadeOutRightBig: [
    {
      opacity: '1',
      transform: 'none',
      offset: 0
    },
    {
      opacity: '0',
      transform: 'translate3d(2000px, 0, 0)',
      offset: 1
    }
  ],
  rollIn: [
    {
      transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  rollOut: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
      opacity: '0',
      offset: 1
    }
  ],
  zoomIn: [
    {
      transform: 'scale3d(.3, .3, .3)  ',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  zoomOutDown: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'center bottom',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
      opacity: '1',
      transformOrigin: 'center bottom',
      offset: 0.4
    },
    {
      transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
      opacity: '0',
      transformOrigin: 'center bottom',
      offset: 1
    }
  ],
  zoomOutUp: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'center bottom',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)',
      opacity: '1',
      transformOrigin: 'center bottom',
      offset: 0.4
    },
    {
      transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)',
      opacity: '0',
      transformOrigin: 'center bottom',
      offset: 1
    }
  ],
  zoomOutRight: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'right center',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)',
      opacity: '1',
      transformOrigin: 'right center',
      offset: 0.4
    },
    {
      transform: 'scale(.1) translate3d(2000px, 0, 0)',
      opacity: '0',
      transformOrigin: 'right center',
      offset: 1
    }
  ],
  zoomOutLeft: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'left center',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)',
      opacity: '1',
      transformOrigin: 'left center',
      offset: 0.4
    },
    {
      transform: 'scale(.1) translate3d(-2000px, 0, 0)',
      opacity: '0',
      transformOrigin: 'left center',
      offset: 1
    }
  ],
  zoomInDown: [
    {
      transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  zoomInLeft: [
    {
      transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  zoomInRight: [
    {
      transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  zoomInUp: [
    {
      transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)',
      opacity: '0',
      offset: 0
    },
    {
      transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
      opacity: '1',
      offset: 0.6
    },
    {
      transform: 'none',
      opacity: '1',
      offset: 1
    }
  ],
  zoomOut: [
    {
      transform: 'none',
      opacity: '1',
      offset: 0
    },
    {
      transform: 'scale3d(.3, .3, .3)  ',
      opacity: '0',
      offset: 1
    }
  ],
  rotateIn: [
    {
      transform: 'rotate3d(0, 0, 1, -200deg)',
      opacity: '0',
      transformOrigin: 'center',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'center',
      offset: 1
    }
  ],
  rotateInDownLeft: [
    {
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
      transformOrigin: 'left bottom',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'left bottom',
      offset: 1
    }
  ],
  rotateInDownRight: [
    {
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
      transformOrigin: 'right bottom',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'right bottom',
      offset: 1
    }
  ],
  rotateInUpLeft: [
    {
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
      transformOrigin: 'left bottom',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'left bottom',
      offset: 1
    }
  ],
  rotateInUpRight: [
    {
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
      transformOrigin: 'right bottom',
      offset: 0
    },
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'right bottom',
      offset: 1
    }
  ],
  rotateOutDownLeft: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'left bottom',
      offset: 0
    },
    {
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
      transformOrigin: 'left bottom',
      offset: 1
    }
  ],
  rotateOutDownRight: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'right bottom',
      offset: 0
    },
    {
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
      transformOrigin: 'right bottom',
      offset: 1
    }
  ],
  rotateOutUpLeft: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'left bottom',
      offset: 0
    },
    {
      transform: 'rotate3d(0, 0, 1, -45deg)',
      opacity: '0',
      transformOrigin: 'left bottom',
      offset: 1
    }
  ],
  rotateOutUpRight: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'right bottom',
      offset: 0
    },
    {
      transform: 'rotate3d(0, 0, 1, 45deg)',
      opacity: '0',
      transformOrigin: 'right bottom',
      offset: 1
    }
  ],
  rotateOut: [
    {
      transform: 'none',
      opacity: '1',
      transformOrigin: 'center',
      offset: 0
    },
    {
      transform: 'rotate3d(0, 0, 1, 200deg)',
      opacity: '0',
      transformOrigin: 'center',
      offset: 1
    }
  ]
}

export default Keyframes

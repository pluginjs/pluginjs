export const namespace = 'sectionScroll'

export const events = {
  DESTROY: 'destroy',
  CHANGE: 'change',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  DOTS: '{namespace}-dots',
  LEFT: '{namespace}-left',
  RIGHT: '{namespace}-right',
  CONTAINER: '{namespace}-container',
  OPEN: '{namespace}-open',
  SCROLL: '{namespace}-scroll',
  STACK: '{namespace}-stack',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'destroy',
  'next',
  'previous',
  'goTo',
  'scrollTo',
  'getId',
  'enable',
  'disable'
]

export const defaults = {
  itemSelector: '', // string => 'selector' or array => ['id-1', 'id-2', 'id-3']
  titleSelector: '', // string => 'selector' or array => ['Title-1', 'Title-2', 'Title-3']
  animation: 'scroll',
  duration: 700,
  easing: 'ease', // ease, linear, easeIn, easeOut, easeInOut, easeInSine, easeOutSine, easeInOutSine, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint, easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc, easeInBack, easeOutBack, easeInOutBack
  touch: true,
  mousewheel: true, // stack always true
  appendTo: 'body',
  placement: 'right', // left or right
  changeHash: true,
  touchSensitivity: 5,
  tooltip: false, // true, false || { theme: 'light large' }
  loop: false,
  dots: {
    theme: null,
    items: null,
    default: null,
    vertical: true,
    valueFrom: 'data-href', // text or data-attr
    template: {
      item(css) {
        return `<li class="${css}" data-href="{href}"><a>{text}</a></li>`
      }
    }
  }, // false
  template() {
    return (
      '<div class="{classes.NAMESPACE} {placement}">' +
      '<ul class="{classes.DOTS}">' +
      '</ul>' +
      '</div>'
    )
  }
}

export const dependencies = ['Hammer', 'dots']

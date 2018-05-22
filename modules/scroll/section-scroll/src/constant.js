export const namespace = 'sectionScroll'

export const events = {
  DESTROY: 'destroy',
  CHANGE: 'change',
  READY: 'ready',
  DESTROY: 'destroy',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  DOTS: '{namespace}-dots',
  SECTION: '{namespace}-section',
  CONTAINER: '{namespace}-container',
  OPEN: '{namespace}-open',
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
  itemSelector: '',
  titleSelector: '',
  animation: 'scroll',
  duration: '',
  easing: '',
  touch: true,
  mousewheel: true,
  appendTo: 'body',
  touchSensitivity: 5,
  dots: {
    theme: null,
    items: null,
    default: null,
    direction: 'vertical',
    valueFrom: 'data-href', // text or data-attr
    template: {
      item(css) {
        return `<li class="${css}" data-href="{href}"><a>{text}</a></li>`
      }
    }
  }, // false
  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '<ul class="{classes.DOTS}">' +
      '</ul>' +
      '</div>'
    )
  }
}

export const dependencies = ['Hammer', 'mousewheel', 'dots']

export const info = { version: '0.0.1' }

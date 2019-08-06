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
  SECTION: '{namespace}-section',
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
  titleSelector: '',
  animation: 'scroll',
  duration: 700,
  easing: 'ease',
  touch: true,
  mousewheel: true, // stack always true
  appendTo: 'body',
  changeHash: true,
  touchSensitivity: 5,
  loop: false,
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

export const dependencies = ['Hammer', 'dots']

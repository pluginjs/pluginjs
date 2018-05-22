export const namespace = 'dots'

export const events = {
  CHANGE: 'change',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  LOAD: 'load',
  SHOW: 'show',
  HIDE: 'hide',
  CLICK: 'click'
}

export const classes = {
  NAMESPACE: 'pj-dot',
  CONTAINER: '{namespace}s',
  THEME: '{namespace}s--{theme}',
  ITEM: '{namespace}',
  VERTICAL: '{namespace}s-vertical',
  HORIZONTAL: '{namespace}s-horizontal',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  HIDDEN: '{namespace}-hidden'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'build',
  'append',
  'prepend',
  'add',
  'remove',
  'empty',
  'load',
  'get',
  'set',
  'show',
  'hide'
]

export const defaults = {
  theme: null,
  items: null,
  default: null,
  direction: 'horizontal', // vertical
  valueFrom: ['a', 'href'], // text or data-attr
  template: {
    item(css) {
      return `<li class="${css}"><a href="{href}">{text}</a></li>`
    }
  }
}

export const info = { version: '0.0.1' }

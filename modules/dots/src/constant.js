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
  TYPE: '{namespace}s-{type}',
  ITEM: '{namespace}',
  VERTICAL: '{namespace}s-vertical',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  HIDDEN: '{namespace}-hidden'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
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
  type: null,
  default: null,
  vertical: false,
  valueFrom: ['a', 'href'], // text or data-attr
  template: {
    item(css) {
      return `<li class="${css}"><a href="{href}">{text}</a></li>`
    }
  }
}

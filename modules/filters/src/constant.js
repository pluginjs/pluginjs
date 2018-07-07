export const namespace = 'filters'

export const events = {
  CHANGE: 'change',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESPONSIVED: 'resposived'
}

export const classes = {
  NAMESPACE: 'pj-filter',
  CONTAINER: '{namespace}s',
  THEME: '{namespace}s--{theme}',
  ITEM: '{namespace}',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  DROPDOWN: '{namespace}-dropdown',
  HIDE: '{namespace}-hide',
  PANEL: '{namespace}-panel'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'build',
  'append',
  'get',
  'set'
]

export const defaults = {
  theme: null,
  items: null,
  default: null,
  valueFrom: 'data-id', // text, [selector, data-attr] or data-attr
  responsive: false,
  dropdownWidth: 120,
  template: {
    item(css) {
      return `<button type='button' class="${css}" data-id="{id}">{text}</button>`
    }
  }
}


export const dependencies = ['dropdown']

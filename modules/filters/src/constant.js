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
  MORE: '{namespace}-more',
  DROPDOWN: '{namespace}-dropdown',
  DROPDOWNITEM: '{namespace}-dropdown-item',
  HIDE: '{namespace}-hide'
}

export const methods = ['enable', 'disable', 'destroy', 'append', 'get', 'set']

export const defaults = {
  theme: null,
  items: null, // [{text: '', id: ''}...]
  default: null,
  valueFrom: 'data-id', // text, [selector, data-attr] or data-attr
  responsive: false,
  responsiveMoreText: 'More',
  templates: {
    item() {
      return '<button type="button" class="{classes.ITEM}" data-id="{id}">{text}</button>'
    },
    more() {
      return '<button type="button" class="{classes.MORE} {classes.ITEM}">{text}</button>'
    }
  }
}

export const dependencies = ['dropdown']

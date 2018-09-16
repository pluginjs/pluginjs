import { isArray } from '@pluginjs/is'
export const namespace = 'select'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLED: 'disabled',
  DESTROY: 'destroy',
  LOAD: 'load',
  OPEN: 'open',
  CLOSE: 'close',
  CLICK: 'click',
  CHANGE: 'change',
  SELECTED: 'select',
  UNSELECTED: 'unselect',
  HIDE: 'hide'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}-wrap',
  MULTIPLE: '{namespace}-multiple',
  FILTERABLE: '{namespace}-filterable',
  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  HASBADGE: '{namespace}-has-badge',
  BADGE: '{namespace}-badge',
  BADGECONTENT: '{namespace}-badge-content',
  BADGEDELETE: '{namespace}-badge-delete',
  LABEL: '{namespace}-label',
  LIST: '{namespace}-list',
  ITEM: '{namespace}-item',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  OPEN: '{namespace}-open',
  NOTFOUND: '{namespace}-not-found',
  DISABLED: '{namespace}-disabled',
  MARK: '{namespace}-mark',
  SELECTED: '{namespace}-selected',
  FOCUS: '{namespace}-focus',
  LOADING: '{namespace}-loading',
  ERROR: '{namespace}-error',
  HIDEICON: '{namespace}-hideIcon',
  BORDER: '{namespace}-border'
}

export const methods = [
  'get',
  'set',
  'val',
  'enable',
  'disable',
  'destroy',
  'removeData',
  'open',
  'close'
]

export const defaults = {
  theme: null,
  trigger: 'click', // 'hover' or 'click'
  offset: [0, 0], // set panel offset to trigger element
  icon: 'pj-icon pj-icon-char pj-icon-chevron-down',
  multiple: false,
  clearable: false,
  filterable: false,
  closeAllButten: true,
  placeholder: 'Please select',
  notFoundText: 'Badge not found',
  selected: null, // item value, string or array
  data: null, // object or url string, take precedence
  keyboard: true,
  disabled: false,
  templates: {
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    trigger() {
      if (this.options.filterable) {
        return '<input class="{classes.TRIGGER}" placeholder="{placeholder}" />'
      }
      return '<span class="{classes.TRIGGER}">{placeholder}</span>'
    },
    label() {
      return '<div class="{classes.LABEL}">{options.placeholder}</div>'
    },
    filterLabel() {
      return '<input placeholder="{options.placeholder}" class="{classes.LABEL}" />'
    },
    badge() {
      return '<div class="{classes.BADGE}" data-flag="{flag}"><span class="{classes.BADGECONTENT}">{label}</span><i class="{classes.BADGEDELETE} pj-icon pj-icon-remove"></i></div>'
    },
    dropdown() {
      return '<div class="{classes.DROPDOWN}"></div>'
    },
    list() {
      return '<ul class="{classes.LIST}"></ul>'
    },
    group() {
      return '<li class="{classes.GROUP}"><span class="{classes.GROUPLABEL}">{group.label}</span></li>'
    },
    item() {
      return '<li class="{classes.ITEM}" data-value="{item.value}">{item.label}</li>'
    },
    notFound() {
      return '<div class="{classes.NOTFOUND}">{options.notFoundText}</div>'
    }
  },
  parse(value) {
    if (value) {
      return this.options.multiple ? value.split(',') : value
    }
    return this.options.multiple ? [] : ''
  },
  process(value) {
    if (value && typeof value !== 'undefined') {
      return isArray(value) ? value.join(',') : value
    }
    return ''
  }
}

export const dependencies = ['dropdown']

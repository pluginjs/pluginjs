import { isObject } from '@pluginjs/is'

export const namespace = 'autoComplete'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  SELECT: 'select',
  CHANGE: 'change',
  HIDE: 'hide',
  HIDED: 'hided',
  SHOW: 'show',
  SHOWN: 'shown',
  CLEAR: 'clear'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  INPUT: '{namespace}-input pj-input',
  TRIGGER: '{namespace}-trigger',
  WRAP: '{namespace}',
  SHOW: '{namespace}-show',
  DROPDOWN: '{namespace}-dropdown',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  ITEMS: '{namespace}-items',
  ITEM: '{namespace}-item pj-dropdown-item',
  FILLED: '{namespace}-filled',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  HINT: '{namespace}-hint'
}

export const methods = [
  'set',
  'get',
  'val',
  'clear',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  match(data, query) {
    return this.match(data, query, {
      sort: true,
      diacritics: false,
      punctuation: false,
      case: false,
      whitespaces: false,
      boundaries: false,
      keys: null
    })
  },
  hint: true,
  minChars: 0,
  limit: 20,
  source: null,
  value: null,
  placeholder: null,
  keyboard: true,
  clearable: true,
  showOnFocus: true,
  clearOnSelected: false,
  hideOnBlur: true,
  dropdown: {
    placement: 'bottom-start' // top
  },
  group: null,
  groupLabel(group) {
    return group
  },
  itemLabel(item) {
    if (isObject(item)) {
      return item.label
    }
    return item
  },
  itemValue(item) {
    if (isObject(item)) {
      return item.value
    }
    return item
  },
  templates: {
    dropdown() {
      return '<div class="{classes.DROPDOWN}"><div class="{classes.ITEMS}"></div></div>'
    },
    trigger() {
      return '<div class="{classes.TRIGGER}"></div>'
    },
    group() {
      return '<div class="{classes.GROUP}"><div class="{classes.GROUPLABEL}">{group}</div></div>'
    },
    item() {
      return '<div class="{classes.ITEM}" data-value="{value}">{label}</div>'
    }
  }
}

export const dependencies = ['dropdown']

export const namespace = 'select'

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
  CLEAR: 'clear',
  FILTER: 'filter'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ELEMENT: '{namespace}-element',
  TRIGGER: '{namespace}-trigger pj-input',
  LABEL: '{namespace}-label',
  WRAP: '{namespace}',
  DROPDOWN: '{namespace}-dropdown',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  OPTION: '{namespace}-option pj-dropdown-item',
  OPTIONDISABLED: '{namespace}-option-disabled pj-dropdown-item-disabled',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FILTERABLE: '{namespace}-filterable',
  FILTER: '{namespace}-filter',
  NOTFOUND: '{namespace}-not-found'
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
  source: null,
  value: null,
  placeholder: 'Please Select',
  filterable: false,
  filter(option, search) {
    return option.label.toLowerCase().includes(search.toLowerCase())
  },
  keyboard: true,
  clearable: false,
  dropdown: {
    placement: 'bottom' // top
  },
  optionLabel(option) {
    return option.label
  },
  templates: {
    group() {
      return '<div class="{classes.GROUP}"><div class="{classes.GROUPLABEL}">{group.label}</div></div>'
    },
    option(option) {
      if (option.disabled) {
        return '<div class="{classes.OPTION} {classes.OPTIONDISABLED}" data-value="{option.value}">{option.label}</div>'
      }
      return '<div class="{classes.OPTION}" data-value="{option.value}">{option.label}</div>'
    }
  },
  parse(value) {
    return value
  },
  process(value) {
    return value
  }
}

export const translations = {
  en: {
    notFoundText: 'No results found'
  },
  zh: {
    notFoundText: '无匹配数据'
  }
}

export const dependencies = ['dropdown']

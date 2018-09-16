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
  SHOWN: 'shown'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ELEMENT: '{namespace}-element',
  TRIGGER: '{namespace}-trigger pj-input',
  WRAP: '{namespace}-wrap',
  DROPDOWN: '{namespace}-dropdown',
  GROUP: '{namespace}-group',
  OPTION: '{namespace}-option pj-dropdown-item',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  source: null,
  value: null,
  placeholder: 'Please Select',
  keyboard: true,
  optionLabel(option) {
    return option.label
  },
  templates: {
    group() {
      return '<div class="{classes.group}">{options}</div>'
    },
    option() {
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

export const dependencies = []

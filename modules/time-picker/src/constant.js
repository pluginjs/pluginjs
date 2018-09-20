export const namespace = 'timePicker'

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
  WRAP: '{namespace}',
  INPUT: '{namespace}-input pj-input',
  INPUTWRAP: '{namespace}-group pj-input-group',
  TRIGGER: '{namespace}-trigger pj-input-group-addon',
  TRIGGERICON: '{namespace}-trigger-icon',
  DROPDOWN: '{namespace}-dropdown',
  SHOW: '{namespace}-show',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FOCUS: '{namespace}-focus'
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
  value: null,
  placeholder: 'Select Time',
  keyboard: true,
  clearable: false,
  use24HourFormat: true,
  max: '',
  min: '',
  step: 30,
  dropdown: {
    placement: 'bottom' // top
  },
  parse(value) {
    return value
  },
  process(value) {
    return value
  }
}

export const dependencies = ['dropdown']

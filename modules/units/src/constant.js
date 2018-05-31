export const namespace = 'units'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  SUBMIT: 'submit',
  SETUNIT: 'setunit',
  CHANGEVAL: 'changeVal'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}-wrap',
  TRIGGER: '{namespace}-trigger',
  PANEL: '{namespace}-panel',
  DISABLED: '{namespace}-disabled',
  ACTIVE: '{namespace}-active',
  ONLY: '{namespace}-only',
  INPUT: '{namespace}-input',
  TOP: '{namespace}-top',
  BOTTOM: '{namespace}-bottom'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'get',
  'getUnit',
  'getInput',
  'val',
  'set',
  'toggleUnit',
  'setWidth'
]

export const defaults = {
  theme: null,
  disabled: false,
  width: null, // number|string|object
  data: null, // array
  placement: 'bottom-end',
  defaultUnit: null,
  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },
  parse(value) {
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return null
      }
    }
    return null
  },
  onChange() {
    return
  },
  onSubmit() {
    return
  }
}

export const dependencies = ['dropdown']

export const info = { version: '0.0.1' }

import { isNull } from '@pluginjs/is'

export const namespace = 'units'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  CHANGEINPUT: 'changeInput',
  CHANGEUNIT: 'changeUnit'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}-wrap',
  TRIGGER: '{namespace}-trigger',
  DROPDOWN: '{namespace}-dropdown',
  DISABLED: '{namespace}-disabled',
  ACTIVE: '{namespace}-active',
  ONLY: '{namespace}-only',
  INPUT: '{namespace}-input pj-input'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'val',
  'get',
  'set',
  'setUnit',
  'setInput',
  'getUnit',
  'getInput'
]

export const defaults = {
  theme: null,
  disabled: false,
  width: '80px',
  units: ['px', '%'], // array
  placement: 'bottom-end',
  defaultUnit: 'px',
  process(value) {
    const { input, unit } = value
    if (!isNull(input) && !isNull(unit)) {
      return `${value.input}${value.unit}`
    }
    return ''
  },
  parse(value) {
    let input = ''
    let unit = ''
    if (value) {
      input = parseFloat(value)
      unit = value.match(/\D+$/g)
      if (isNull(unit)) {
        unit = this.options.defaultUnit
      } else {
        unit = unit[0]
      }
    }

    return {
      input,
      unit
    }
  },
  onChange() {
    return
  },
  onSubmit() {
    return
  }
}

export const dependencies = ['dropdown']

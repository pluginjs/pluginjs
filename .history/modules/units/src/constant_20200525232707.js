import { isNull, isString } from '@pluginjs/is'

export const namespace = 'units'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  CHANGEINPUT: 'changeInput',
  CHANGEUNIT: 'changeUnit',
  CHANGESTATIC: 'changeStatic'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}',
  TRIGGER: '{namespace}-trigger',
  DROPDOWN: '{namespace}-dropdown',
  DISABLED: '{namespace}-disabled',
  ACTIVE: '{namespace}-active',
  ONLY: '{namespace}-only',
  INPUT: '{namespace}-input pj-input',
  STATIC: '{namespace}-static'
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
  units: {},
  placement: 'bottom-end',
  defaultUnit: 'px',
  process(value) {
    if (this.isStatic(value)) {
      return value
    }
    const { input, unit } = value
    if (!isNull(input) && !isNull(unit)) {
      if(unit == 'no')
      return `${value.input}`
      return `${value.input}${value.unit}`
    }
    return ''
  },
  parse(value) {
    let input = ''
    let unit = ''
    if (value) {
      if (!isString(value)) {
        value = value.toString()
      }
      if (this.isStatic(value)) {
        return value
      }

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
  }
}

export const dependencies = ['dropdown']

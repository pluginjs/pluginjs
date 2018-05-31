import is from '@pluginjs/is'
export const namespace = 'spinner'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  FOCUS: '{namespace}-focus',
  CONTROL: '{namespace}-control',
  DOWN: '{namespace}-down',
  UP: '{namespace}-up',
  WRAP: '{namespace}',
  CONTROLRIGHT: '{namespace}-control-right'
}

export const methods = [
  'get',
  'set',
  'val',
  'enable',
  'disable',
  'destroy',
  'update',
  'spinDown',
  'spinUp'
]

export const defaults = {
  theme: null,
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  name: null,
  precision: 0,
  rule: null, // string, shortcut define max min step precision
  unit: null, // null | object ==> { 'unitName' : {min:[number],max:[number],step:[number]}, ...}
  layout: 'both', // both | right

  looping: true, // if cycling the value when it is outofbound
  mousewheel: false, // support mouse wheel
  templates: {
    control() {
      return `<div class="{control}"><span class="{up} icon-plus"></span><span class="{down} icon-minus"></span></div>`
    }
  },
  process(value) {
    if (value && !is.undefined(value)) {
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
  }
}

export const dependencies = ['units', 'mousewheel']

export const info = { version: '0.4.2' }

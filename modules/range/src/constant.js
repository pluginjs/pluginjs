import { isArray } from '@pluginjs/is'

export const namespace = 'range'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  MOVE: 'move',
  POINTERUPDATE: 'pointerUpdate',
  POINTERMOVE: 'pointerMove',
  POINTERMOVESTART: 'pointerMoveStart',
  POINTERMOVEEND: 'pointerMoveEnd',
  POINTERACTIVE: 'pointerActive',
  POINTERDEACTIVE: 'pointerDeactive'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}',
  CONTROL: '{namespace}-control',
  DISABLED: '{namespace}-disabled',
  RAIL: '{namespace}-rail',
  POINTER: '{namespace}-pointer',
  POINTERACTIVE: '{namespace}-pointer-active',
  SCALE: '{namespace}-scale',
  LINES: '{namespace}-scale-lines',
  GRID: '{namespace}-scale-grid',
  INLINEGRID: '{namespace}-scale-inlineGrid',
  VALUES: '{namespace}-scale-values',
  TRACK: '{namespace}-track',
  TIP: '{namespace}-tip',
  TIPSHOW: '{namespace}-tip-show',
  VERTICAL: '{namespace}-vertical',
  INPUT: 'pj-input {namespace}-input'
}

export const methods = ['val', 'get', 'set', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  max: 100,
  min: 0,
  step: 1,
  value: null,
  limit: true,
  range: false,
  input: false,
  vertical: false,
  keyboard: false,
  tip: 'move', // move, always
  tipContent(pointer) {
    const value = pointer.value
    if (this.options.replaceFirst && value === this.min) {
      return this.options.replaceFirst
    }
    return value
  },
  replaceFirst: false,
  parse(value) {
    if (this.options.range) {
      const array = value.split('-').map(v => parseFloat(v, 10))
      if (array.length === 1) {
        array[1] = array[0]
      } else if (array[0] > array[1]) {
        const temp = array[1]
        array[1] = array[0]
        array[0] = temp
      }
      return array
    }
    if (this.options.replaceFirst && value === this.options.replaceFirst) {
      return this.min
    }
    return parseFloat(value, 10)
  },
  process(value) {
    if (this.options.range && isArray(value)) {
      return value.join('-')
    }
    if (this.options.replaceFirst && value === this.min) {
      return this.options.replaceFirst
    }
    return value.toString()
  }
}

export const dependencies = []

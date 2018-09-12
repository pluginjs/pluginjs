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
  LAYOUT: '{namespace}-layout-{layout}'
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
  layout: 'both', // both | right

  looping: true, // if cycling the value when it is outofbound
  mousewheel: true, // support mouse wheel
  templates: {
    control() {
      if (this.options.layout === 'right') {
        return `<div class="{classes.CONTROL}">
  <span class="{classes.UP} pj-icon pj-icon-add-small"></span>
  <span class="{classes.DOWN} pj-icon pj-icon-minus-small"></span>
</div>`
      }
      return `<div class="{classes.CONTROL}">
  <span class="{classes.UP} pj-icon pj-icon-add-solid"></span>
  <span class="{classes.DOWN} pj-icon pj-icon-minus-solid"></span>
</div>`
    }
  },
  process(value) {
    return value.toString()
  },
  parse(value) {
    if (value) {
      value = parseFloat(value, 10)

      return Math.min(Math.max(this.min, value), this.max)
    }
    return parseFloat(this.min)
  }
}

export const dependencies = []

export const namespace = 'range'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  MOVE: 'move',
  CHANGEUNIT: 'changeUnit'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}',
  CONTROL: '{namespace}-control',
  DISABLED: '{namespace}-disabled',
  BAR: '{namespace}-bar',
  POINTER: '{namespace}-pointer',
  POINTERACTIVE: '{namespace}-pointer-active',
  SCALE: '{namespace}-scale',
  LINES: '{namespace}-scale-lines',
  GRID: '{namespace}-scale-grid',
  INLINEGRID: '{namespace}-scale-inlineGrid',
  VALUES: '{namespace}-scale-values',
  SELECTED: '{namespace}-selected',
  TIP: '{namespace}-tip',
  SHOW: '{namespace}-tip-s',
  UNIT: '{namespace}-unit'
}

export const methods = [
  'val',
  'get',
  'set',
  'setInterval',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  max: 100,
  min: 0,
  value: null,
  step: 1,
  unit: null,
  defaultUnit: null,
  limit: true,
  isRange: false,
  direction: 'h', // 'v' or 'h'
  keyboard: false,
  tip: true,
  scale: true,
  parse(input) {
    console.log(input)
    let unit = null
    const val = []
    let data = {}

    if (input) {
      if (typeof input === 'number') {
        return { input }
      }

      if (input.match(/([a-zA-Z]+|%)+/gi)) {
        unit = input.match(/([a-zA-Z]+|%)+/gi)[0]
        input = input.split(unit)[0]
      }

      const args = input.split(',')

      args.forEach(v => {
        val.push(parseFloat(v, 10))
      })

      data = { input: val }

      if (data.input.length === 1) {
        data.input = data.input[0]
      }

      if (unit) {
        data.unit = unit
      }

      return data
    }
    return this.options.range ? [] : ''
  },
  process(data) {
    const val = data.input
    const unit = data.unit

    if (data) {
      if (typeof val === 'string') {
        if (unit) {
          return `${val}${unit}`
        }

        return val
      }

      if (Array.isArray(val)) {
        if (unit) {
          val.forEach((v, i) => {
            val[i] = `${v}${unit}`
          })
        }
        return val.join(',')
      }
    }

    return ''
  }
}

export const dependencies = ['units']

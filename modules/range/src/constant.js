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
  parse(value) {
    let unit = null
    const val = []
    let data = {}

    if (value) {
      if (typeof value === 'number') {
        return { value }
      }

      if (value.match(/([a-zA-Z]+|%)+/gi)) {
        unit = value.match(/([a-zA-Z]+|%)+/gi)[0]
        value = value.split(unit)[0]
      }

      const args = value.split(',')

      args.forEach(v => {
        val.push(parseFloat(v, 10))
      })

      data = { value: val }

      if (data.value.length === 1) {
        data.value = data.value[0]
      }

      if (unit) {
        data.unit = unit
      }

      return data
    }
    return this.options.range ? [] : ''
  },
  process(data) {
    const val = data.value
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

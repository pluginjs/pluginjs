export const namespace = 'progress'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  DESTROY: 'destroy',
  FINISH: 'finish',
  STOP: 'stop',
  RESET: 'reset',
  START: 'start',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  LABEL: '{namespace}-label',
  VALUE: '{namespace}-value',
  BAR: '{namespace}-bar',
  DISABLED: '{namespace}-disabled',
  VERTICAL: '{namespace}-vertical'
}

export const methods = [
  'get',
  'start',
  'stop',
  'finish',
  'reset',
  'go',
  'disable',
  'enable',
  'destroy'
]

export const defaults = {
  theme: null,
  bootstrap: false,
  min: 0,
  max: 100,
  goal: 100,
  speed: 20, // speed of 1/100
  easing: 'ease',
  direction: 'horizontal', // horizontal, vertical

  templates: {
    label() {
      return '<span class="{classes.LABEL}">{content}</span>'
    }
  },
  valueCallback(n) {
    const percentage = this.getPercentage(n)
    return `${percentage}%`
  }
}

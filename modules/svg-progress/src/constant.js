export const namespace = 'svgProgress'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  DESTROY: 'destroy',
  START: 'start',
  GO: 'go',
  RESET: 'reset',
  STOP: 'stop',
  FINISH: 'finish',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  SVG: '{namespace}-svg',
  ELEMENT: '{namespace}',
  NUMBER: '{namespace}-number',
  CONTENT: '{namespace}-content',
  DISABLED: '{namespace}-disabled',
  INFOS: '{namespace}-infos'
}

export const methods = [
  'get',
  'start',
  'finish',
  'stop',
  'reset',
  'go',
  'disable',
  'enable',
  'destroy'
]

export const defaults = {
  theme: null,
  min: 0,
  max: 100,
  goal: 100,
  size: 80,
  speed: 15, // speed of 1/100
  barcolor: '#55a4f2',
  barsize: '4',
  trackcolor: '#f7f9fc',
  fillcolor: 'none',
  easing: 'ease',
  numberCallback(n) {
    const percentage = Math.round(this.getPercentage(n))
    return `${percentage}%`
  },
  contentCallback: null
}


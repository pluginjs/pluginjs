export const namespace = 'svgProgress'

export const events = {
  READY: 'ready',
  START: 'start',
  STOP: 'stop',
  COMPLETE: 'complete',
  RESET: 'reset',
  RESUME: 'resume',
  RESTART: 'restart',
  UPDATE: 'update',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  SHAPE: '{namespace}-{shape}',
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
  'restart',
  'resume',
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
  autoplay: false,
  easing: x => x, // 'ease', 'linear', 'ease-in', 'ease-out'
  shape: 'circle',
  barcolor: '#215fdb',
  barsize: '2',
  trackcolor: 'rgba(0, 0, 0, 0.1)',
  fillcolor: 'none',
  numberCallback(n) {
    return `${Math.round(this.getPercentage(n))}%`
  },
  contentCallback: null
}

export const namespace = 'progress'

export const events = {
  READY: 'ready',
  START: 'start',
  STOP: 'stop',
  COMPLETE: 'complete',
  PAUSE: 'pause',
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
  ELEMENT: '{namespace}',
  LABEL: '{namespace}-label',
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
  'pause',
  'restart',
  'resume',
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
  easing: 'ease', // 'ease', 'linear', 'ease-in', 'ease-out'
  speed: 15, // speed of 1/100
  autoplay: false,
  direction: 'horizontal', // horizontal, vertical
  label: false,
  templates: {
    label() {
      return '<span class="{classes.LABEL}">{content}</span>'
    }
  },
  labelCallback(n) {
    return `${this.getPercentage(n)}%`
  }
}

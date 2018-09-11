export const namespace = 'magnify'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  // ENTER: 'enter',
  // LEAVE: 'leave',
  MOVE: 'move',
  SHOW: 'show',
  HIDE: 'hide',
  ERROR: 'error'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}',
  IMAGE: '{namespace}-image',
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show',
  ERROR: '{namespace}-error',
  ERRORSHOW: '{namespace}-error-show',
  ENLARGED: '{namespace}-enlarged',
  ENLAREDSHOW: '{namespace}-enlarged-show',
  MODE: '{namespace}-{mode}'
}

export const methods = []

export const defaults = {
  mode: 'inside', // outside
  loader: {},
  trigger: 'hover', // click, toggle
  error: 'The image load failed',
  errorDuration: 3000,
  templates: {
    error() {
      return '<span class="{classes.ERROR}">{text}</span>'
    },
    enlarged() {
      return '<div class="{classes.ENLARGED}"></div>'
    }
  }
}

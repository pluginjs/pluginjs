export const namespace = 'magnify'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  // ENTER: 'enter',
  // LEAVE: 'leave',
  MOVE: 'move',
  ENTER: 'enter',
  LEAVE: 'leave',
  SHOW: 'show',
  HIDE: 'hide',
  ERROR: 'error'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}',
  ZOOM: '{namespace}-zoom',
  IMAGE: '{namespace}-image',
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show',
  ERROR: '{namespace}-error',
  ERRORSHOW: '{namespace}-error-show',
  TARGET: '{namespace}-target',
  TARGETSHOW: '{namespace}-target-show',
  MODE: '{namespace}-{mode}',
  OUTSIDEPLACEMENT: '{namespace}-outside-{placement}',
  MOVING: '{namespace}-moving'
}

export const methods = []

export const defaults = {
  mode: 'inside', // outside
  target: null,
  placement: 'left', // left, right, top, bottom
  limit: true,
  loader: {},
  trigger: 'hover', // click, toggle
  error: 'The image load failed',
  errorDuration: 3000,
  zoom: 3,
  templates: {
    error() {
      return '<span class="{classes.ERROR}">{text}</span>'
    }
  }
}

export const dependencies = ['Hammer']

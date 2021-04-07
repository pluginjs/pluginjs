export const namespace = 'magnify'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ZOOM: 'zoom',
  MOVE: 'move',
  ENTER: 'enter',
  LEAVE: 'leave',
  SHOW: 'show',
  HIDE: 'hide',
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}',
  ZOOM: '{namespace}-zoom',
  IMAGE: '{namespace}-image',
  LENS: '{namespace}-lens',
  HASLENS: '{namespace}-has-lens',
  OVERLAY: '{namespace}-overlay',
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show',
  ERROR: '{namespace}-error',
  ERRORSHOW: '{namespace}-error-show',
  TARGET: '{namespace}-target',
  TARGETSHOW: '{namespace}-target-show',
  MODE: '{namespace}-{mode}',
  TRIGGER: '{namespace}-{trigger}',
  OUTSIDEPLACEMENT: '{namespace}-outside-{placement}',
  MOVING: '{namespace}-moving'
}

export const methods = [
  'zoomUp',
  'zoomDown',
  'zoomTo',
  'zoomBy',
  'show',
  'hide',
  'swap',
  'disable',
  'enable',
  'destroy'
]

export const defaults = {
  mode: 'inside', // outside
  target: null,
  placement: 'left', // left, right, top, bottom
  limit: true,
  loader: {},
  trigger: 'hover', // click, toggle
  error: 'The image load failed',
  errorDuration: 3000,
  min: 1.5,
  max: 5,
  zoom: 3,
  zoomable: true,
  zoomStep: 0.1,
  lens: true,
  lensOverlay: 'rgba(0,0,0,0.4)',
  templates: {
    error() {
      return '<span class="{classes.ERROR}">{text}</span>'
    },
    lens() {
      return '<div class="{classes.lens}"></div>'
    }
  }
}

export const dependencies = ['Hammer']

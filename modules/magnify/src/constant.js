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
  ERROR: 'error',
  LOADED: 'loaded'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}-wrap',
  MODE: '{namespace}-{mode}',
  INSIDE: '{namespace}-inside',
  ROUND: '{namespace}-round',
  WINDOW: '{namespace}-window',
  WINDOWIMAGE: '{namespace}-window-image',
  OVERLAY: '{namespace}-overlay',
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  LENS: '{namespace}-lens',
  LENSIMAGE: '{namespace}-lens-image',
  POSITION: '{namespace}-window-{position}',
  IMAGE: '{namespace}-image',
  SHOW: '{namespace}-show',
  ERROR: '{namespace}-error',
  ERRORSHOW: '{namespace}-error-show'
}

export const methods = [
  'zoomUp',
  'zoomDown',
  'zoomTo',
  'changeMode',
  'disable',
  'enable',
  'destroy'
]

export const defaults = {
  mode: 'window', // round, inside, window
  source: 'data-origin',
  wrapSelector: null,
  windowWidth: 400, // when mode is window
  windowHeight: 400, // when mode is window
  loader: {
    size: 'lg'
  },
  min: 1.2,
  max: 5,
  zoom: 2.5,
  zoomable: true,
  zoomStep: 0.1,
  error: 'The image load failed',
  errorDuration: 3000,
  position: 'right', // left, right, top, bottom
  trigger: 'hover', // click, toggle
  templates: {
    window() {
      return '<div class="{classes.WINDOW}"><img class="{classes.WINDOWIMAGE}" src="" alt="" /></div>'
    },
    overlay() {
      return '<div class="{classes.OVERLAY}"></div>'
    },
    lens() {
      return '<div class="{classes.LENS}"><img class="{classes.LENSIMAGE}" src="" alt="" /></div>'
    },
    error() {
      return '<span class="{classes.ERROR}">{text}</span>'
    }
  }
}

export const dependencies = ['Hammer']

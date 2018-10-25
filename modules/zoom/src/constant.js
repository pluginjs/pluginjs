export const namespace = 'zoom'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  OPEN: 'open',
  CLOSE: 'close',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  IMAGE: '{namespace}',
  OPENED: '{namespace}-opened',
  THEME: '{namespace}--{theme}',
  OVERLAY: '{namespace}-overlay',
  OVERLAYSHOW: '{namespace}-overlay-show',
  FOCUS: '{namespace}-focus'
}

export const methods = [
  'open',
  'close',
  'toggle',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  original: null,
  preload: false,
  closeOnResize: true,
  closeOnScroll: true,
  scrollOffset: 30,
  closeOnESC: true,
  toggleOnEnter: false,
  zoomHeight: null,
  zoomWidth: null,
  overlay: 'rgb(255,255,255)',
  scale: 1,
  templates: {
    overlay() {
      return '<div class="{classes.OVERLAY}"></div>'
    }
  }
}

export const dependencies = []

export const namespace = 'headroom'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  PINNED: '{namespace}-pinned',
  UNPINNED: '{namespace}-unpinned',
  TOP: '{namespace}-top',
  NOTTOP: '{namespace}-notTop',
  STICK: '{namespace}-stick',
  UNSTICK: '{namespace}-unstick'
}

export const methods = ['destroy', 'disable', 'enable']

export const defaults = {
  type: 'pinned',
  // offsetSide: 'top',
  pinned: {
    tolerance: {
      down: 10,
      up: 20
    },
    offsetSide: 'top',
    offset: 1000
  },
  sticky: { spacing: 20 }
}
export const dependencies = ['sticky', 'scroll-dir']
export const info = { version: '0.0.1' }

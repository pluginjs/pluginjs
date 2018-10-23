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
  UNPINNED: '{namespace}-unpinned'
}

export const methods = ['destroy', 'disable', 'enable']

export const defaults = {
  tolerance: {
    down: 10,
    up: 10
  },
  offsetSide: 'top', // the side of element offset from
  offset: 300,
  duration: 0.3,
  easing: 'ease'
}

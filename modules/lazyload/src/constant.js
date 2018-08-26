export const namespace = 'lazyload'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  LOAD: 'load',
  LOADED: 'loaded'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  LOADING: '{namespace}ing',
  LOADED: '{namespace}ed'
}

export const methods = ['enable', 'disable', 'destroy', 'forceLoad', 'isLoad']

export const defaults = {
  src: null,
  srcset: null
}

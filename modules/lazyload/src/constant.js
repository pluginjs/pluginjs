export const namespace = 'lazyload'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ENTER: 'enter',
  LOADED: 'loaded'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  LOADED: '{namespace}-loaded'
}

export const methods = [
  'value',
  'enable',
  'disable',
  'destroy',
  'setAnimation',
  'setAnimationDelay',
  'beforeLoad',
  'afterLoad',
  'load',
  'isLoad',
  'setDelay'
]

export const defaults = {
  src: null,
  srcset: null,
  delay: null
}

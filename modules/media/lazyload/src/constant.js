export const namespace = 'lazyload'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ENTER: 'enter'
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
  threshold: 0,
  src: null,
  retina: false,
  srcset: null,
  delay: null,
  animation: null
}

export const info = { version: '0.0.1' }

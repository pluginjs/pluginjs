export const namespace = 'parallax'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ENTER: 'enter'
}

export const methods = [
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
  theme: null,
  speed: 1000,
  delayType: 'throttle',
  delay: 100,
  offset: 0,
  mode: 'translateX',
  max: null,
  min: null
}

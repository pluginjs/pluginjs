const namespace = 'pj-swipeable'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  DRAGSTART: 'dragStart',
  DRAGEND: 'dragEnd',
  RESIZE: 'resize'
}

const classes = {
  NAMESPACE: `${namespace}`,
  DISABLED: '{namespace}-disabled'
}

const methods = ['enable', 'disable', 'destroy']

const defaults = {
  containment: null,
  rebound: false,
  reboundPercent: 100, // 1%~100% (without %)
  offset: 0,
  frictionFactor: 0.8,
  timeConstant: 400,
  power: 2,
  decay: false,
  axis: 'x' // 'x' or 'y'
}

const dependencies = ['Hammer']

const info = { version: '0.0.1' }

export { namespace, classes, defaults, events, methods, dependencies, info }

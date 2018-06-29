const namespace = 'pj-swipeable'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  DRAGSTART: 'dragStart',
  DRAGMOVE: 'dragMove',
  DRAGEND: 'dragEnd'
}

const classes = {
  NAMESPACE: `${namespace}`,
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  GRID: '{namespace}-grid',
  DISABLED: '{namespace}-disabled'
}

const methods = ['getPosition', 'setPosition', 'enable', 'disable', 'destroy']

const defaults = {
  // containment: null,
  // grid: [0, 0],
  frictionFactor: 0.8,
  timeConstant: 350,
  power: 2,
  decay: false,
  axis: null // 'x' or 'y'
}

const dependencies = ['Hammer']

const info = { version: '0.0.1' }

export { namespace, classes, defaults, events, methods, dependencies, info }

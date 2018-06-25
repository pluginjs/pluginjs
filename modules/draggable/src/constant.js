const namespace = 'pj-draggable'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  DRAGSTART: 'dragStart',
  DRAGMOVE: 'dragmove',
  DRAGEND: 'dragEnd'
}

const classes = {
  NAMESPACE: `${namespace}`,
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  GRID: '{namespace-grid}',
  DISABLED: '{namespace}-disabled'
}

const methods = ['get', 'set', 'enable', 'disable', 'destroy']

const defaults = {
  containment: null,
  grid: [0, 0],
  axis: null // 'x' or 'y'
}

const dependencies = ['Hammer']

export { namespace, classes, defaults, events, methods, dependencies }

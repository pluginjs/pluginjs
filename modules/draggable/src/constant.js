const namespace = 'draggable'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  DRAGSTART: 'dragstart',
  DRAGMOVE: 'dragmove',
  DRAGEND: 'dragend',
  POINTER: 'pointer'
}

const classes = {
  NAMESPACE: `pj-${namespace}`,
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  GRID: '{namespace}-grid',
  DISABLED: '{namespace}-disabled'
}

const methods = ['setPosition', 'enable', 'disable', 'destroy']

const defaults = {
  container: null,
  grid: [0, 0],
  axis: null // 'x' or 'y'
}

const dependencies = ['Hammer']

const info = { version: '0.0.1' }

export { namespace, classes, defaults, events, methods, dependencies, info }

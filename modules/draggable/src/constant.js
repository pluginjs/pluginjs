export const namespace = 'draggable'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  DRAGSTART: 'dragstart',
  DRAGMOVE: 'dragmove',
  DRAGEND: 'dragend',
  POINTER: 'pointer'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  GRID: '{namespace}-grid',
  DISABLED: '{namespace}-disabled'
}

export const methods = ['setPosition', 'enable', 'disable', 'destroy']

export const defaults = {
  container: null,
  grid: [0, 0],
  axis: null // 'x' or 'y'
}

export const dependencies = ['Hammer']

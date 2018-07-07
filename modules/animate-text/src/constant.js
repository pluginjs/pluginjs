export const namespace = 'animateText'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-multiple'
}

export const methods = ['value', 'enable', 'disable', 'destroy', 'set']

export const defaults = {
  mode: 'fadeDown',
  loop: true,
  delay: 0,
  duration: 1000
}

export const dependencies = ['anime']


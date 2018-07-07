export const namespace = 'reveal'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  ENTER: 'enter',
  EXIT: 'exit',
  DISABLE: 'disable',
  ENABLE: 'enable',
  ANIMATIONEND: 'animationEnd'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  DISABLED: '{namespace}-disabled'
}

export const methods = ['destroy', 'enable', 'disable', 'isVisible']

export const defaults = {
  animation: 'fadeIn',
  duration: 400,
  easing: 'ease',
  delay: 0,
  count: 1, // infinite
  mode: 'always', // 'once'
  mobile: false,
  tablet: false,
  anchor: ''
}


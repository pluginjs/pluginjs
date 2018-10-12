export const namespace = 'reveal'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  ENTER: 'enter',
  EXIT: 'exit',
  DISABLE: 'disable',
  ENABLE: 'enable',
  END: 'end'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  DISABLED: '{namespace}-disabled'
}

export const methods = ['destroy', 'enable', 'disable', 'isVisible']

export const defaults = {
  animation: 'fadeIn',

  count: 1, // infinite
  mode: 'always', // 'once'
  mobile: false,
  tablet: false,
  anchor: '',

  offset: 0,
  duration: 400,
  delay: 0,
  easing: 'ease',
  loop: true,
  threshold: 0 // Either a single number or an array of numbers  [0, 0.25, 0.5, 0.75, 1]
}

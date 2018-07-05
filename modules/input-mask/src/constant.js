export const namespace = 'inputMask'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  FOCUS: 'focus',
  BLUR: 'blur'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  INPUT: '{namespace}-input',
  INPUTMODE: 'pj-input'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  type: 'custom',
  delimiter: '',
  blocks: 'noLimit'
}

export const info = { version: '0.0.1' }

export const namespace = 'toggle'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  SIZE: '{namespace}-{size}',
  WRAP: '{namespace}',
  ON: '{namespace}-on',
  OFF: '{namespace}-off',
  ISOFF: '{namespace}-is-off',
  HANDLE: '{namespace}-handle',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'check',
  'uncheck',
  'set',
  'val',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,

  dragable: true,
  clickable: true,
  disabled: false,

  size: null,

  showText: false,
  locale: 'en',

  onContent: null,
  offContent: null,

  checked: null,
  duration: 200
}

export const dependencies = ['Hammer']

export const translations = {
  en: {
    on: 'ON',
    off: 'OFF'
  },
  zh: {
    on: '&nbsp;I',
    off: 'O'
  }
}

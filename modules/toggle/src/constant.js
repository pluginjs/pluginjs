export const namespace = 'toggle'

export const events = {
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
  INNER: '{namespace}-inner',
  ON: '{namespace}-on',
  OFF: '{namespace}-off',
  ICONON: '{namespace}-on-icon',
  ICONOFF: '{namespace}-off-icon',
  ISOFF: '{namespace}-is-off',
  HANDLE: '{namespace}-handle',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'check',
  'uncheck',
  'get',
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

  onText: null,
  offText: null,

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
    on: '开',
    off: '关'
  }
}

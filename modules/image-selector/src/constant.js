export const namespace = 'imageSelector'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  INIT: '{namespace}-init',
  HIDE: '{namespace}-hide',
  SHOW: '{namespace}-show',
  ACTIVE: '{namespace}-active',
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  OPENDISABLE: '{namespace}-open-disabled',
  DATA: '{namespace}-data',
  CHANGE: '{namespace}-change',
  PANEL: '{namespace}-panel',
  ITEM: '{namespace}-item',
  ITEMLABEL: '{namespace}-item-label',
  SCROLLWRAP: '{namespace}-scroll-wrap',
  WRAPPER: '{namespace}-wrapper',
  MASK: '{namespace}-mask'
}

export const methods = ['get', 'set', 'val', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  disabled: false,
  locale: 'en',
  localeFallbacks: true,
  data: null,
  hideOutClick: true
  // select: null // set initial select value, if null , choose the first value
}

export const dependencies = ['scrollable']

export const translations = {
  en: { change: 'Change' },
  zh: { change: '改变布局' }
}

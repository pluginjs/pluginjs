export const namespace = 'loader'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  SHOW: 'show',
  HIDE: 'hide'
}

export const classes = {
  NAMESPACE: 'pj-loader',
  THEME: '{namespace}--{theme}',
  HIDDEN: '{namespace}-hidden',
  TEXT: '{namespace}-text',
  MASK: '{namespace}-mask'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'show',
  'hide',
  'toggle'
]

export const defaults = {
  theme: 'circle',
  text: null,
  background: null
}

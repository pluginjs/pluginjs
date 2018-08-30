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
  SIZE: '{namespace}-{size}',
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
  size: null, // sm, lg
  text: null,
  background: null,
  color: null
}

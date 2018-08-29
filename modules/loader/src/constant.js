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
  HIDDEN: '{namespace}-hidden'
}

export const methods = ['enable', 'disable', 'destroy', 'show', 'hide']

export const defaults = {
  theme: null
}

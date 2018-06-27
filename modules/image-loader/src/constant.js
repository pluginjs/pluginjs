export const namespace = 'imageLoader'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'load',
  'onError',
  'onComplete',
  'onLoaded',
  'finally',
  'add'
]

export const defaults = {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  selector: null // img selector, default is 'img' tag.
}

export const info = { version: '0.2.2' }

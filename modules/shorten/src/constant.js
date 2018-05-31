export const namespace = 'shorten'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  EXPAND: 'expand',
  COLLAPSE: 'collapse'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  EXPAND: '{namespace}-expand',
  DETAIL: '{namespace}-detail',
  ELLIPSES: '{namespace}-ellipses',
  TOGGLE: '{namespace}-toggle'
}

export const methods = ['collapse', 'expand', 'destroy']

export const defaults = {
  theme: null,
  chars: 100,
  ellipses: '...',
  more: 'more',
  less: 'less'
}

export const info = { version: '0.3.1' }

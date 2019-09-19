export const namespace = 'shares'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: 'pj-share',
  CONTAINER: '{namespace}s',
  THEME: '{namespace}s-{theme}',
  SHARE: '{namespace}',
  TOOLTIP: '{namespace}-tooltip'
}

export const methods = ['enable', 'disable', 'destroy', 'getShare', 'getShares']

export const defaults = {
  theme: null,
  url: '',
  title: '',
  description: '',
  image: '',
  prefix: 'share_',
  tooltip: {
    theme: 'light',
    offset: '8,8'
  }
}

export const dependencies = ['tooltip']

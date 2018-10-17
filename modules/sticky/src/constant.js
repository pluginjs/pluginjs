export const namespace = 'sticky'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  STICKY: 'sticky',
  STUCK: 'stuck',
  UNSTICKY: 'unsticky'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  DISABLED: '{namespace}-disabled',
  PARENT: '{namespace}-parent',
  STICKY: '{namespace}-sticky',
  STUCK: '{namespace}-stuck',
  WRAP: '{namespace}-wrap',
  DEFAULT: '{namespace}-default'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  wrap: null,
  spacing: 0,
  templates: {
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    }
  }
}

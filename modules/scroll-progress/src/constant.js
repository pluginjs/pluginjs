export const namespace = 'scrollProgress'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  REFRESH: 'refresh'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  BAR: '{namespace}-bar',
  WRAP: '{namespace}-wrap',
  DISABLED: '{namespace}-disabled'
}

export const methods = ['enable', 'disable', 'destroy', 'refresh']

export const defaults = {
  size: 5,
  innerColor: '#50bcb6',
  wrapColor: '',
  opacity: 1,
  custom: true,
  appendTo: 'body',
  position: 'top-left',
  templates: {
    bar() {
      return '<div class="{classes.BAR}"></div>'
    },
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    }
  }
}

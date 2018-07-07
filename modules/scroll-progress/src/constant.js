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
  DISABLED: '{namespace}-disabled'
}

export const methods = ['enable', 'disable', 'destroy', 'refresh']

export const defaults = {
  size: 5,
  color: '#50bcb6',
  opacity: 1,
  custom: true,
  appendTo: 'body',
  position: 'top-left',
  templates: {
    bar() {
      return '<div class="{classes.BAR}"></div>'
    }
  }
}

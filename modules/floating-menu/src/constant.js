export const namespace = 'floatingMenu'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  OPEN: 'open',
  CLOSE: 'close'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  MASK: '{namespace}-mask',
  NAV: '{namespace}-nav',
  TOGGLE: '{namespace}-toggle',
  CONTENT: '{namespace}-content',
  PANEL: '{namespace}-panel',
  ACTIVE: '{namespace}-active',
  LOCK: '{namespace}-lock'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  type: 'html', // html, data
  data: null,
  templates: {
    mask() {
      return '<div class="{classes.MASK}"></div>'
    }
  }
}

export const dependencies = []

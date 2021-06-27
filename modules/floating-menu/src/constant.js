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
  type: 'html', // html, data (when type if data, element is the wrap element, such as document.body)
  data: null,
  templates: {
    mask() {
      return '<div class="{classes.MASK}"></div>'
    },
    element() {
      return `
      <div class="{classes.NAMESPACE}">
        <div class="{classes.NAV}"></div>
        <div class="{classes.CONTENT}"></div>
      </div>
      `
    },
    toggle() {
      return '<a href="{toggle.url}" class="{classes.TOGGLE}" title="{toggle.title}">{icon}{toggle.title}</a>'
    },
    icon() {
      return '<i class="{toggle.icon}"></i>'
    },
    panel() {
      return '<div class="{classes.PANEL}" data-id="{panel.id}">{panel.html}</div>'
    }
  }
}

export const dependencies = []

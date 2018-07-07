export const namespace = 'radio'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  CHECK: 'check',
  UNCHECK: 'uncheck'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}',
  THEME: '{namespace}-{theme}',
  ICON: '',
  CHECKED: '{namespace}-checked',
  DISABLED: '{namespace}-disable'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'get',
  'set',
  'val',
  'check',
  'uncheck'
]

export const defaults = {
  theme: null,
  classes: { button: '{namespace}-default' },
  disabled: false,
  getWrap() {
    const parent = this.element.parentNode
    if (parent.classList.contains(this.classes.WRAP)) {
      return parent
    }
    return undefined
  },
  getLabel() {
    const label = this.element.nextElementSibling
    if (label) {
      return label
    }

    const id = this.element.id

    return Array.from(document.querySelectorAll('label')).filter(
      l => l.getAttribute('for') === id
    )[0]
  },
  getIcon() {
    return this.label.querySelector('i')
  },

  getGroup() {
    const name = this.element.getAttribute('name')
    return Array.from(document.querySelectorAll('input')).filter(
      el => el.name === name
    )
  },
  templates: {
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    icon() {
      return '<i class="{classes.ICON}"></i>'
    }
  }
}

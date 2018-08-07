import { parentWith, nextWith, query, queryAll } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'

export const namespace = 'checkbox'

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
  DISABLED: '{namespace}-disabled'
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
    return parentWith(hasClass(this.classes.WRAP), this.element)
  },
  getLabel() {
    const $label = nextWith(el => el.tagName === 'LABEL', this.element)
    if ($label.length > 0) {
      return $label
    }

    const id = this.element.getAttribute('id')

    return query(`label[for="${id}"]`)
  },
  getIcon() {
    return query('i:first-child', this.$label)
  },
  getGroup() {
    return queryAll(`input[name="${this.element.getAttribute('name')}"]`)
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

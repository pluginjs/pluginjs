import { isString } from '@pluginjs/is'

export const namespace = 'autoComplete'

export const events = {
  READY: 'ready',
  CHANGE: 'change',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  INPUT: 'pj-input {namespace}-input',
  PANEL: '{namespace}-panel',
  PANELONTOP: '{namespace}-panel-on-top',
  CLOSE: '{namespace}-close',
  ITEM: '{namespace}-item',
  RESULT: '{namespace}-result',
  MARK: '{namespace}-mark',
  ACTIVE: '{namespace}-active',
  HOVER: '{namespace}-hover',
  GROUP: '{namespace}-group',
  GROUPTITLE: '{namespace}-group-title',
  GROUPCONTENTS: '{namespace}-group-contents',
  GROUPSHOW: '{namespace}-group-show',
  SHOW: '{namespace}-show',
  OPEN: '{namespace}-open',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'enable',
  'disable',
  'open',
  'close',
  'clear',
  'next',
  'prev',
  'set',
  'get',
  'val',
  'destroy'
]

export const defaults = {
  theme: null,
  data: null,
  keyboard: true,

  minChars: 1,
  maxItems: 5,
  disabled: false,

  panelWidth: null, // [string]/[number]  panel width

  sensitivity: false,
  highlight: false,

  group: false, // if true, group title => 'id', group contents => 'list'

  placeholder: 'Please Search...',
  templates: {
    panel() {
      return `<div class='{classes.PANEL}'>
      </div>`
    },
    item() {
      return `<div class='{classes.ITEM}'>
      {contents}</div>`
    },
    group() {
      return `<section class='{classes.GROUP}' data-group='{group}'>
        <header class='{classes.GROUPTITLE}'>{title}</header>
        <div class="{classes.GROUPCONTENTS}"></div>
      </section>`
    },
    icon() {
      return '<i class="{classes.CLOSE} {icon}"></i>'
    },
    mark() {
      return `<mark class='{classes.MARK}'>
      {contents}</mark>`
    }
  },

  render() {
    return false
  },

  source: [],

  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },
  parse(value) {
    if (value && isString(value)) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return null
      }
    }
    return null
  },
  onChange(...args) {
    const [data, instance] = args
    instance.set(data.value)
    return false
  }
}

export const dependencies = ['popper.js']

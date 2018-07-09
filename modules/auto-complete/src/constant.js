import is from '@pluginjs/is'

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

  ajax: false,
  minChars: 1,
  maxItems: 5,
  disabled: false,

  panelWidth: null, // [string]/[number]  panel width

  sensitivity: false,
  highlight: false,

  group: false, // if true, group title => 'id', group contents => 'list'

  placeholder: 'Please Search...',
  templates: {
    input() {
      return `<input type='text' class='pj-input {class}' placeholder='{placeholder}'
      />`
    },
    panel() {
      return `<div class='{classes.PANEL}'>
      </div>`
    },
    item() {
      return `<div class='{classes.ITEM}'>
      {contents}</div>`
    },
    group() {
      return `<section class='{class}' data-group='{group}'>
        <header class='{titleClass}'>{title}</header>
        <div class="{contentsClass}"></div>
      </section>`
    },
    icon() {
      return '<i class="{classes.CLOSE} {icon}"></i>'
    },
    mark() {
      return `<mark class='{class}'>
      {contents}</mark>`
    }
  },

  render() {
    return false
  },
  source(val) {
    /* eslint-disable */
    $.getJSON('/ajax', { q: val }, data => {
      this.handleEl.bind(this, data)
    })
    /* eslint-enable */
  },

  process(value) {
    if (value && !is.undefined(value)) {
      return JSON.stringify(value)
    }
    return ''
  },
  parse(value) {
    if (value && is.string(value)) {
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

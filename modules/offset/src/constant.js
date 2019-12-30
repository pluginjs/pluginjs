export const namespace = 'offset'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  CONNECTLINK: '{namespace}-connect-link',
  CONNECTUNLINK: '{namespace}-connect-unlink',
  WRAP: '{namespace}-wrap',
  INPUT: '{namespace}-input',
  HAHA: '{namespace}-haha',
  TOP: '{namespace}-top',
  RIGHT: '{namespace}-right',
  BOTTOM: '{namespace}-bottom',
  LEFT: '{namespace}-left',
  LOCK: '{namespace}-lock',
  LOCKACTIVE: '{namespace}-lock-active',
  UNIT: '{namespace}-unit',
  SELECTUNIT: '{namespace}-unit-trigger',
  SIZELABEL: '{namespace}-size-label',
  SIZE: '{namespace}-size'
}

export const methods = [
  'get',
  'set',
  'val',
  'move',
  'enable',
  'disable',
  'destroy',
  'clear'
]

export const defaults = {
  locale: 'en',
  source: [
    {
      value: 'px',
      label: 'px'
    },
    {
      value: 'pt',
      label: 'pt'
    },
    {
      value: 'em',
      label: 'em'
    },
    {
      value: 'rem',
      label: 'rem'
    },
    {
      value: '%',
      label: '%'
    }
  ],
  templates: {
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    size() {
      return `<div class="{classes.SIZE}">
      <input id="right" class="{field} {classes.INPUT}" type="number" value="">
      <div class="{classes.SIZELABEL}" >{reverse}</div>
      </div>`
    },
    lock() {
      return '<div class="{classes.LOCK}"><i class="{classes.CONNECTLINK} pj-icon pj-icon-lock"></i><i class="{classes.CONNECTUNLINK} pj-icon pj-icon-unlock"></i></div>'
    },
    unit() {
      return '<div class="{classes.UNIT}"><input type="text" class="{classes.SELECTUNIT}"/></div>'
    }
  },

  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },

  parse(value) {
    if (value) {
      try {
        return JSON.parse(value.replace(/\'/g, '"')) /* eslint-disable-line */
      } catch (e) {
        return {}
      }
    }
    return {}
  }
}

export const dependencies = ['tooltip', 'dropdown', 'units']

export const translations = {
  en: {
    brokenLink: 'Broken Link',
    keepLink: 'Keep Them Constant'
  },
  zh: {
    brokenLink: '解开链接',
    keepLink: '保持链接'
  }
}

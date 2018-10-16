export const namespace = 'strength'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHECK: 'check',
  STATUSCHANGE: 'statusChange',
  TOGGLE: 'toggle'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  CONTAINER: '{namespace}',
  STATUS: '{namespace}-{status}',
  INPUT: '{namespace}-input',
  TOGGLE: '{namespace}-toggle',
  METER: '{namespace}-meter',
  SCORE: '{namespace}-score',
  SHOWN: '{namespace}-shown',
  ACTIVE: '{namespace}-active',
  ADDON: '{namespace}-addon',
  CHECK: '{namespace}-check',
  DISABLE: '{namespace}-disabled',
  HASICON: '{namespace}-has-icon',
  ICON: '{namespace}-icon',
  SHOW: '{namespace}-show'
}

export const methods = ['getScore', 'getStatus', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,

  score: true, // query || true || false
  toggle: true, // query || true || false

  container: true, // query || true

  usernameField: '',

  templates: {
    addon() {
      // '<span class="{classes.ADDON} pj-input-group"><input type="checkbox" class="{classes.TOGGLE}" title="{label}" checked /><i class="{classes.CHECK} pj-icon pj-icon-done-small"></i></span>',
      return `<span class="{classes.ADDON}">
      </span>`
    },
    icon() {
      return `<i class="{classes.ICON}">
      </i>`
    },
    score() {
      return `<span class="{classes.SCORE}">
      </span>`
    }
  },

  scoreLables: {
    empty: 'Empty',
    invalid: 'Invalid',
    weak: 'Weak',
    good: 'Good',
    strong: 'Strong'
  },

  scoreClasses: {
    empty: '',
    invalid: 'label-danger',
    weak: 'label-warning',
    good: 'label-info',
    strong: 'label-success'
  },

  emptyStatus: true,

  scoreCallback: null,
  statusCallback: null,

  locale: 'en',
  localeFallbacks: true
}

export const translations = {
  en: {
    Empty: 'Empty',
    Invalid: 'Invalid',
    Weak: 'Weak',
    Good: 'Good',
    Strong: 'Strong',
    toggle: 'Show/Hide Password'
  },
  zh: {
    Empty: '空',
    Invalid: '无效',
    Weak: '弱',
    Good: '中',
    Strong: '强',
    toggle: '显示/隐藏 密码'
  }
}

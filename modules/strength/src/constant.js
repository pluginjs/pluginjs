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
  CONTAINER: '{namespace}-container',
  STATUS: '{namespace}-{status}',
  INPUT: '{namespace}-input',
  TOGGLE: '{namespace}-toggle',
  METER: '{namespace}-meter',
  SCORE: '{namespace}-score',
  SHOWN: '{namespace}-shown'
}

export const methods = ['getScore', 'getStatus', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,

  showMeter: true,
  showToggle: true,

  usernameField: '',

  templates: {
    toggle:
      '<span class="input-group-addon"><input type="checkbox" class="{classes.TOGGLE}" title="{label}" /></span>',
    meter: '<div class="{classes.METER}">{score}</div>',
    score: '<span class="label {classes.SCORE}"></span>',
    main:
      '<div class="{classes.CONTAINER}"><div class="input-group">{input}{toggle}</div>{meter}</div>'
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

export const info = { version: '0.2.4' }

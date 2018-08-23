export const namespace = 'countdown'

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  MODE: '{namespace}-{mode}',
  TIME: '{namespace}-time',
  NUMBER: '{namespace}-number',
  LABEL: '{namespace}-label'
}

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const methods = ['init', 'enable', 'disable', 'destroy', 'start', 'stop']

export const labelMap = {
  Y: 'years',
  YM: 'month', // yearToMonths
  M: 'months',
  W: 'weeks',
  WM: 'weeks', // weekToMonths
  DM: 'days', // dayToMonths
  DW: 'days', // dayToWeeks
  TS: 'seconds', // totalMinutes
  TM: 'minutes', // totalMinutes
  TH: 'hours', // totalMinutes
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
}

export const defaults = {
  theme: null,
  mode: 'simple', // 'simple','flip','progress
  modes: {
    simple: {},
    flip: {},
    progress: {}
  },
  format: 'd,h,m,s',
  label: true, // "天,时，分，秒"
  labelPosition: 'bottom', // bottome | above
  due: `${new Date().getFullYear() + 1}-1-1`, // scheduled time
  now: new Date(), // now time
  templates: {
    wrap() {
      return '<div class="{classes.TIME} {labelType}"></div>'
    },
    label() {
      return '<span class="{classes.LABEL}">{text}</span>'
    },
    time() {
      return '<span class="{classes.NUMBER} {classes.NAMESPACE}-{labelType}"></span>'
    }
  }
}

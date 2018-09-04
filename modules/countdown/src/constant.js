export const namespace = 'countdown'

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  MODE: '{namespace}-{mode}',
  TIME: '{namespace}-time',
  NUMBER: '{namespace}-number',
  LABEL: '{namespace}-label',
  PROGRESS: '{namespace}-progress',
  CONTENT: '{namespace}-content',
  RING: '{namespace}-ring',
  FLIP: '{namespace}-flip',
  TURN: '{namespace}-turn'
}

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  START: 'start',
  STOP: 'stop',
  UPDATE: 'update'
}

export const methods = ['init', 'enable', 'disable', 'destroy', 'start', 'stop']

export const KEY_MAP = {
  TD: 'totalDays',
  TH: 'totalHours',
  TM: 'totalMinutes',
  TS: 'totalSeconds',
  Y: 'years',
  MM: 'months',
  WM: 'weeksToMonth',
  W: 'weeks',
  DM: 'daysToMonth',
  DW: 'daysToWeek',
  D: 'days',
  H: 'hours',
  M: 'minutes',
  S: 'seconds'
}

export const defaults = {
  theme: null,
  mode: 'simple', // 'simple','flip','progress
  format: 'TD,H,M,S', // which key to show
  places: '3,2,2,2', // key places
  overall: false, // event trigger Modularity
  label: 'default', // 'default' or custom labels like 'day,hour,month,second'
  labelInverse: false, // bottome | above
  due: '2019-9-9', // scheduled time
  interval: 1000, // refresh interval
  maximums: '999,24,60,60', // progress module maximums
  svgSize: 100, // progress size
  svgBarsize: 2, // progress bar size
  svgTrackcolor: 'rgba(0,0,0, 0.1)', // progress track color
  svgFillcolor: '#215fdb', // progress fill color
  templates: {
    simple() {
      return `<div class="{classes.TIME} {classes.NAMESPACE}-{type}">
                {number}
                {label}
              </div>`
    },
    progress() {
      return `<div class="{classes.TIME} {classes.NAMESPACE}-{type}">
                <div class="{classes.CONTENT}">
                  {number}
                  {label}
                </div>
                {ring}
              </div>`
    },
    flip() {
      return `<div class="{classes.TIME} {classes.NAMESPACE}-{type}">
                {label}
                 <div class="{classes.CONTENT}">
                  {number}
                  {number}
                  {number}
                  {number}
                 </div>
              </div>`
    },
    number() {
      return '<span class="{classes.NUMBER}">{number}</span>'
    },
    label() {
      return '<span class="{classes.LABEL}">{label}</span>'
    },
    ring() {
      return '<div class={classes.RING}></div>'
    }
  }
}

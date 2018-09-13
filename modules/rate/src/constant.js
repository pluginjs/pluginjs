export const namespace = 'rate'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  CHANGEHOVERSCORE: 'changeHoverScore',
  MOUSELEAVE: 'mouseLeave',
  CHANGESCORE: 'changeScore',
  CLICK: 'click'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  UNIT: '{namespace}-unit',
  HALF: '{namespace}-half',
  FULL: '{namespace}-full',
  HALFACTIVE: '{namespace}-half-active',
  DISABLED: '{namespace}-disabled',
  CLEAR: '{namespace}-clear'
}

export const methods = [
  'destroy',
  'getScore',
  'getHoverScore',
  'setScore',
  'clear',
  'readonly',
  'setColor',
  'resetIcon'
]

export const defaults = {
  template() {
    return '<ul class="{classes.NAMESPACE}"></ul>'
  },
  templates: {
    unit() {
      return (
        '<li class="{classes.UNIT}">' +
        '<div class="{classes.HALF}">' +
        '{icon}' +
        '</div>' +
        '<div class="{classes.FULL}">' +
        '{icon}' +
        '</div>' +
        '</li>'
      )
    },
    units() {
      return (
        '<li class="{classes.UNIT}">' +
        '<div class="{classes.HALF}">' +
        '{svg}' +
        '</div>' +
        '<div class="{classes.FULL}">' +
        '{svg}' +
        '</div>' +
        '</li>'
      )
    },
    icon() {
      return '<i class="{iconClass}"></i>'
    },
    svg() {
      return '<img src="{path}" width="{width}">'
    }
  },
  iconClass: 'pj-icon pj-icon-star-solid',
  iconColorClass: '',
  min: 2,
  max: 5,
  value: 0,
  readonly: false,
  half: true,
  step: 0.5,
  iconSize: null,
  svg: ''
}

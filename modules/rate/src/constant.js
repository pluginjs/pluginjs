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
  STAR: '{namespace}-star',
  HALFSTAR: '{namespace}-star-first',
  FULlSTAR: '{namespace}-star-second',
  HALFSTARACTIVE: '{namespace}-star-half',
  DISABLED: '{namespace}-disabled',
  CLEARCOLOR: '{namespace}-clear-color',
  DEFAULTCOLOR: '{namespace}-default-color'
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
    return '<ul class="{classes.NAMESPACE}">' + '</ul>'
  },
  templates: {
    star() {
      return (
        '<li class="{classes.STAR}">' +
        '<div class="{classes.HALFSTAR}">' +
        '{icon}' +
        '</div>' +
        '<div class="{classes.FULlSTAR}">' +
        '{icon}' +
        '</div>' +
        '</li>'
      )
    },
    stars() {
      return (
        '<li class="{classes.STAR}">' +
        '<div class="{classes.HALFSTAR}">' +
        '{svg}' +
        '</div>' +
        '<div class="{classes.FULlSTAR}">' +
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
  iconClass: 'icon-star',
  iconColorClass: '',
  min: 2,
  max: 5,
  value: 0,
  readonly: false,
  halfStar: true,
  step: 0.5,
  iconSize: '',
  svg: ''
}


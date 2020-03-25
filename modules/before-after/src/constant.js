export const namespace = 'beforeAfter'

export const events = {
  READY: 'ready',
  HOVER: 'hover',
  HOVERED: 'hovered',
  DRAG: 'drag',
  DRAGGED: 'dragged',
  CHANGE: 'change',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DIRECTION: '{namespace}-{direction}',
  CONTAINER: '{namespace}',
  BEFORE: '{namespace}-before',
  AFTER: '{namespace}-after',
  HANDLE: '{namespace}-handle',
  ARROWBEFORE: '{namespace}-arrow-before',
  ARROWAFTER: '{namespace}-arrow-after',
  LABELS: '{namespace}-labels',
  LABELTHEME: '{namespace}-labels-{theme}',
  LABELBEFORE: '{namespace}-label-before',
  LABELAFTER: '{namespace}-label-after',
  LABELHIDE: '{namespace}-label-hide',
  HIDE: '{namespace}-hide',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  DRAGGING: '{namespace}-dragging',
  HOVERING: '{namespace}-hovering'
}

export const methods = ['moveBy', 'moveTo', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null, // circle, line, outline, rectangle
  labelTheme: null, // solid, bordered, start, end, overlay
  direction: 'horizontal', // horizontal, vertical
  initial: 0.9, // initial position for slider, 0 to 1
  showLabel: true,
  drag: true,
  clickMove: true,
  duration: 500,
  easing: 'easeInOutSine', // https://easings.net/
  labels: {
    before: 'Before',
    after: 'After'
  },
  arrows: {
    left: 'pj-icon pj-icon-caret-thin-left',
    right: 'pj-icon pj-icon-caret-thin-right',
    up: 'pj-icon pj-icon-caret-thin-up',
    down: 'pj-icon pj-icon-caret-thin-down'
  },
  templates: {
    handle() {
      return (
        '<div class="{classes.HANDLE}">' +
        '<i class="{classes.ARROWBEFORE} {arrows.before}"></i>' +
        '<i class="{classes.ARROWAFTER} {arrows.after}"></i>' +
        '</div>'
      )
    },
    labels() {
      return (
        '<div class="{classes.LABELS} {theme}">' +
        '<div class="{classes.LABELBEFORE}">{labels.before}</div>' +
        '<div class="{classes.LABELAFTER}">{labels.after}</div>' +
        '</div>'
      )
    }
  }
}

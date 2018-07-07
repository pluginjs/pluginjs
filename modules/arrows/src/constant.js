export const namespace = 'arrows'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  NEXT: 'next',
  PREV: 'prev',
  SHOW: 'show',
  HIDE: 'hide'
}

export const classes = {
  NAMESPACE: 'pj-arrow',
  CONTAINER: '{namespace}s',
  THEME: '{namespace}s--{theme}',
  TYPE: '{namespace}s-{type}',
  PREV: '{namespace}-prev',
  NEXT: '{namespace}-next',
  VERTICAL: '{namespace}s-vertical',
  HORIZONTAL: '{namespace}s-horizontal',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  HIDDEN: '{namespace}-hidden',
  ICON: '{namespace}-icon'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'build',
  'load',
  'next',
  'prev',
  'show',
  'hide'
]

export const defaults = {
  theme: null,
  type: null,
  prev: {
    href: 'javascript:void(0);',
    text: 'Previous'
  },
  next: {
    href: 'javascript:void(0);',
    text: 'Next'
  },
  direction: 'horizontal', // vertical
  valueFrom: 'href', // text, data-attr or ['a', 'href']
  templates: {
    prev() {
      return '<a class="{classes.PREV}" href="{href}" alt="{text}"><i class="{classes.ICON} icon-chevron-left"></i></a>'
    },
    next() {
      return '<a class="{classes.NEXT}" href="{href}" alt="{text}"><i class="{classes.ICON} icon-chevron-right"></i></a>'
    }
  }
}


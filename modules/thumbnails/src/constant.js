const namespace = 'thumbnails'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  PREV: 'prev',
  NEXT: 'next'
}

const classes = {
  NAMESPACE: 'pj-thumb',
  THEME: '{namespace}s--{theme}',
  THUMBS: '{namespace}s',
  INNER: '{namespace}s-inner',
  THUMB: '{namespace}',
  LOADER: '{namespace}-loader',
  LOADED: '{namespace}-loaded',
  VIDEO: '{namespace}-video',
  IMAGE: '{namespace}-img',
  VERTICAL: '{namespace}s-vertical',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  RESPONSIVE: '{namespace}-responsive'
}

const methods = ['enable', 'disable', 'destroy', 'next', 'prev', 'go']

const defaults = {
  templates: {
    inner() {
      return '<div class="{classes.INNER}"></div>'
    },
    thumb() {
      return (
        '<div class="{classes.THUMB}">' +
        '<div class="{classes.LOADER}"></div>' +
        '<img class="{classes.IMAGE}">' +
        '</div>'
      )
    }
  },
  data: 'html', // html or DATA
  delegate: 'img',
  vertical: false,
  current: 0,
  mode: 'full', // full or center
  loader: {
    theme: 'ring',
    color: '#000',
    size: 'lg'
  },// false , options
  breakpoint: null // xs, sm, md, lg, xl
}

const dependencies = ['anime']

export { classes, defaults, events, methods, namespace, dependencies }

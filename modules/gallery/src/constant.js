const namespace = 'gallery'

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
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}',
  SLIDER: '{namespace}-slider',
  THUMBS: '{namespace}-thumbs',
  VERTICAL: '{namespace}-vertical',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled'
}

const methods = ['enable', 'disable', 'destroy', 'next', 'prev', 'go']

const defaults = {
  templates: {
    slider() {
      return '<div class="{classes.SLIDER}"></div>'
    },
    box() {
      return '<div class="{classes.BOX}"></div>'
    },
    card() {
      return (
        '<div class="{classes.CARD}">' +
        '<div class="{classes.LOADER}"></div>' +
        '</div>'
      )
    },
    image() {
      return '<img class="{classes.IMAGE} {classes.LOADED}" src="{data.src}">'
    },
    video() {
      return '<div class="{classes.VIDEO} {classes.LOADED}"></div>'
    },
    thumbs() {
      return '<div class="{classes.THUMBS}"></div>'
    },
    inner() {
      return '<div class="{classes.INNER}"></div>'
    },
    thumb() {
      return (
        '<div class="{classes.THUMB}">' +
        '<div class="{classes.LOADED}">' +
        '</div>' +
        '</div>'
      )
    }
  },
  order: ['slider', 'thumbs'],
  data: 'html', // html or DATA
  delegate: '>*',
  arrows: true,
  vertical: false,
  current: 2,
  mode: 'full', // full or center
  duration: 300
}

const dependencies = ['slider', 'thumbnails', 'arrows', 'anime', 'hammer']

const info = { version: '0.0.1' }

export { classes, defaults, events, methods, namespace, dependencies, info }

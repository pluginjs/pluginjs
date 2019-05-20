const namespace = 'gallery'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
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

const methods = ['enable', 'disable', 'destroy']

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
      return '<img class="{classes.IMAGE} {classes.CONTENT}">'
    },
    video() {
      return (
        '<div class="{classes.VIDEOWRAP} {classes.CONTENT}">' +
        '<img class="{classes.IMAGE}">' +
        '<div class="{classes.VIDEO}"></div>' +
        '</div>'
      )
    },
    iframe() {
      return '<iframe class="{classes.IFRAME} {classes.CONTENT}" src="//about:blank" frameborder="0" allowfullscreen></iframe>'
    },
    map() {
      return '<iframe class="{classes.MAP} {classes.CONTENT}" src="//about:blank" frameborder="0" allowfullscreen></iframe>'
    },
    inline() {
      return '<div class="{classes.INLINE} {classes.CONTENT}"></div>'
    },
    thumbs() {
      return '<div class="{classes.THUMBS}"></div>'
    },
    inner() {
      return '<div class="{classes.INNER}"></div>'
    }
  },
  order: ['slider', 'thumbs'],
  data: 'html', // html or DATA
  delegate: '>*',
  arrows: true,
  vertical: false,
  current: 2,
  mode: 'full', // full or center
  duration: 300,
  loader: {
    theme: 'ring',
    color: '#000000',
    size: 'lg'
  },
  slider: {
    // options
  },
  thumb: {
    // options
  }
}

const dependencies = ['slider', 'thumbnails', 'arrows', 'anime', 'hammer']

export { classes, defaults, events, methods, namespace, dependencies }

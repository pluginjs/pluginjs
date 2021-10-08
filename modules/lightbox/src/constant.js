const namespace = 'lightbox'

const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-container',
  OVERLAY: '{namespace}-overlay',
  TOPBAR: '{namespace}-topbar',
  COUNTER: '{namespace}-counter',
  PLAY: '{namespace}-play',
  START: '{namespace}-start',
  STOP: '{namespace}-stop',
  FULLSCREEN: '{namespace}-fullscreen',
  ISFULL: '{namespace}-isfull',
  FULL: '{namespace}-full',
  MINI: '{namespace}-mini',
  DOWNLOAD: '{namespace}-download',
  CLOSE: '{namespace}-close',
  FOOTER: '{namespace}-footer',
  CAPTION: '{namespace}-caption',
  TITLE: '{namespace}-title',
  SLIDER: '{namespace}-slider',
  THUMBS: '{namespace}-thumbs',
  VERTICAL: '{namespace}-vertical',
  AUTOPLAY: '{namespace}-autoplay',
  SHOW: '{namespace}-show',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  RESPONSIVE: '{namespace}-responsive'
}

const methods = ['enable', 'disable', 'destroy', 'show', 'hide']

const defaults = {
  templates: {
    container() {
      return '<div class="{classes.CONTAINER}"></div>'
    },
    overlay() {
      return '<div class="{classes.OVERLAY}"></div>'
    },
    topbar() {
      return '<div class="{classes.TOPBAR}"></div>'
    },
    counter() {
      return '<div class="{classes.COUNTER}"></div>'
    },
    play() {
      return '<span class="{classes.PLAY}"><i class="{classes.START} pj-icon pj-icon-caret-right"></i><i class="{classes.STOP} pj-icon pj-icon-pause"></i></span>'
    },
    fullScreen() {
      return '<span class="{classes.FULLSCREEN}"><i class="{classes.FULL} pj-icon pj-icon-maximize"></i><i class="{classes.MINI} pj-icon pj-icon-minimize"></i></span>'
    },
    download() {
      return '<span class="{classes.DOWNLOAD}"><i class="pj-icon pj-icon-download"></i></span>'
    },
    close() {
      return '<span class="{classes.CLOSE}"><i class="pj-icon pj-icon-remove"></i></span>'
    },
    footer() {
      return '<div class="{classes.FOOTER}"></div>'
    },
    caption() {
      return '<div class="{classes.CAPTION}"></div>'
    },
    title() {
      return '<div class="{classes.TITLE}">{title}</div>'
    },
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
  theme: null,
  data: null, // html or DATA
  delegate: 'a',
  actions: ['play', 'fullScreen', 'download', 'close'], // ['play', 'fullScreen', 'download', 'share', 'close']
  overlayClose: true,
  counter: true,
  arrows: {},
  caption: true,
  hasThumbs: true,
  vertical: false,
  keyboard: true,
  duration: 300,
  playCycle: 4000,
  breakpoint: null, // xs, sm, md, lg, xl
  loader: {
    theme: 'ring',
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

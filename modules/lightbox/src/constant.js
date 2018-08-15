const namespace = 'lightbox'

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
  OVERLAY: '{namespace}-overlay',
  TOPBAR: '{namespace}-topbar',
  COUNTER: '{namespace}-counter',
  PLAY: '{namespace}-play',
  FULLSCREEN: '{namespace}-fullscreen',
  DOWNLOAD: '{namespace}-download',
  CLOSE: '{namespace}-close',
  FOOTER: '{namespace}-footer',
  CAPTION: '{namespace}-caption',
  TITLE: '{namespace}-title',
  SLIDER: '{namespace}-slider',
  THUMBS: '{namespace}-thumbs',
  VERTICAL: '{namespace}-vertical',
  SHOW: '{namespace}-show',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled'
}

const methods = ['enable', 'disable', 'destroy', 'next', 'prev', 'go']

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
      return '<span class="{classes.PLAY}"><i class="icon-caret-right"></i></span>'
    },
    fullScreen() {
      return '<span class="{classes.FULLSCREEN}"><i class="icon-full-screen"></i></span>'
    },
    download() {
      return '<span class="{classes.DOWNLOAD}"><i class="icon-download"></i></span>'
    },
    close() {
      return '<span class="{classes.CLOSE}"><i class="icon-close"></i></span>'
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
    },
    thumb() {
      return (
        '<div class="{classes.THUMB}">' +
        '<div class="{classes.LOADED}">' +
        '<img class="{classes.IMAGE}">' +
        '</div>' +
        '</div>'
      )
    }
  },
  data: 'html', // html or DATA
  delegate: 'a',
  actions: ['play', 'fullScreen', 'download', 'close'], // ['play', 'fullScreen', 'download', 'share', 'close']
  overlayClose: true,
  arrows: true,
  swipe: true,
  caption: true,
  thumbs: true,
  vertical: false,
  keyboard: false,
  duration: 300
}

const dependencies = ['slider', 'thumbnails', 'arrows', 'anime', 'hammer']

export { classes, defaults, events, methods, namespace, dependencies }

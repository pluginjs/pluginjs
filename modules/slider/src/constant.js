const namespace = 'slider'

const events = {
  READY: 'ready',
  LOADED: 'loaded',
  ERROR: 'error',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize',
  CHANGE: 'change',
  PREV: 'prev',
  NEXT: 'next'
}

const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}',
  BOX: '{namespace}-box',
  CARD: '{namespace}-card',
  LOADER: '{namespace}-loader',
  LOADED: '{namespace}-loaded',
  CONTENT: '{namespace}-content',
  IMAGE: '{namespace}-image',
  VIDEO: '{namespace}-video',
  VIDEOWRAP: '{namespace}-video-wrap',
  IFRAME: '{namespace}-iframe',
  MAP: '{namespace}-map',
  INLINE: '{namespace}-inline',
  LOADING: '{namespace}-loading',
  ACTIVE: '{namespace}-active',
  VERTICAL: '{namespace}-vertical',
  DISABLED: '{namespace}-disabled'
}

const methods = ['enable', 'disable', 'destroy', 'prev', 'next']

const defaults = {
  data: null,
  height: null, // width 100% default, height percentage default
  arrows: true,
  arrowType: 'solid',
  loop: true,
  vertical: false,
  current: 0,
  duration: 300,
  autoplay: false,
  playCycle: 4000,
  prevIcon: 'icon-chevron-left',
  nextIcon: 'icon-chevron-right',
  templates: {
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
    }
  }
}

const dependencies = ['arrows']

export { classes, defaults, events, methods, namespace, dependencies }

const namespace = 'slider'

const events = {
  READY: 'ready',
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
  IMAGE: '{namespace}-image',
  VIDEO: '{namespace}-video',
  ACTIVE: '{namespace}-active',
  VERTICAL: '{namespace}-vertical',
  DISABLED: '{namespace}-disabled'
}

const methods = ['enable', 'disable', 'destroy', 'prev', 'next']

const defaults = {
  data: null,
  arrows: true,
  vertical: false,
  current: null,
  duration: 300,
  locale: 'en',
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
      return '<img class="{classes.IMAGE} {classes.LOADED}" src="{data.src}">'
    },
    video() {
      return '<div class="{classes.VIDEO} {classes.LOADED}"></div>'
    }
  }
}

const dependencies = ['arrows']

export { classes, defaults, events, methods, namespace, dependencies }

export const namespace = 'parallax'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ENTER: 'enter',
  LEAVE: 'leave'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-container'
}

export const methods = ['enable', 'disable', 'destroy', 'setSpeed', 'getSpeed']

export const defaults = {
  theme: null,
  container: null,
  direction: 'vertical', // 'vertical', 'horizontal'
  type: 'scroll', // 'scroll', 'opacity', 'scale'
  speed: 0.5, // 0 ~ 1
  mode: 'background', // 'background', 'image'
  image: null, // null, src, {} => src , srcset
  video: null, // null, {}
  loader: true, // true, false, {}
  templates: {
    image() {
      return '<img class="{classes.IMAGE}">'
    }
  }
}

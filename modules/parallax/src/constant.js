export const namespace = 'parallax'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ENTER: 'enter'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-container',
  IMAGE: '{namespace}-image'
}

export const methods = ['show']

export const defaults = {
  theme: null,
  container: null,
  direction: 'down', // 'down', 'up', 'left', 'right'
  mode: 'image', // 'image', 'background', 'video', 'element'
  speed: 1,
  loaderConfig: null,
  type: 'scroll', // 'scroll', 'opacity', 'scale', 'rotate'
  offset: 0,
  animate: 'translateY',
  max: null,
  min: null,
  templates: {
    image() {
      return '<img class="{classes.IMAGE}">'
    }
  }
}

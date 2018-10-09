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
  direction: 'vertical', // 'vertical', 'horizontal'
  mode: 'image', // 'image', 'background', 'video'
  speed: 0.5,
  loaderConfig: null,
  type: 'scroll', // 'scroll', 'opacity', 'scale'
  videoSrc: '', // video mode
  videoMuted: true, // video mode
  imageSrc: '', // image mode, background mode
  templates: {
    image() {
      return '<img class="{classes.IMAGE}">'
    }
  }
}

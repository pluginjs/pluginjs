export const namespace = 'bgVideo'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  PLAY: 'play',
  PAUSE: 'pause',
  STOP: 'stop'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  OVERLAY: '{namespace}-overlay',
  POINTEREVENTNONE: 'pointer-events-none'
}

export const methods = [
  'destroy',
  'play',
  'pause',
  'stop',
  'setVolume',
  'change'
]

export const defaults = {
  template() {
    return '<div class="{classes.NAMESPACE}">' + '</div>'
  },
  type: '',
  // overlay: false,
  video: {
    id: '',
    url: '',
    mute: true,
    repeat: true,
    autoplay: true,
    mobileImage: ''
  }
}

export const dependencies = ['video']

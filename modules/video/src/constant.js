export const namespace = 'video'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  LOAD: 'load',
  LOADED: 'loaded',
  PLAY: 'play',
  PAUSE: 'pause',
  STOP: 'stop',
  ENDED: 'ended',
  ERROR: 'error',
  BUFFERING: 'buffering'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  POSTER: '{namespace}-poster',
  POSTERHIDE: '{namespace}-poster-hide'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'pause',
  'load',
  'play',
  'stop',
  'volume',
  'setSize',
  'switchVideo',
  'duration',
  'currentTime',
  'mute',
  'unMute',
  'setCurrentTime'
]

export const defaults = {
  templates: {
    poster() {
      return '<div class="{classes.POSTER}"></div>'
    }
  },
  width: '100%',
  height: 400,
  url: '',
  id: '',
  type: '',
  autoplay: true,
  loop: true,
  controls: false,
  poster: ''
}

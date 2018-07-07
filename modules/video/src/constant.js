export const namespace = 'video'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  LOAD: 'load',
  LOADED: 'loaded',
  PLAY: 'play',
  PAUSE: 'pause',
  STOP: 'stop',
  PLAYEND: 'playend',
  PLAYERR: 'playerr'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  POSTER: '{namespace}-poster'
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
  template() {
    return '<div class="{classes.NAMESPACE}">' + '{poster}' + '</div>'
  },
  templates: {
    poster() {
      return '<div class="{classes.POSTER}"></div>'
    }
  },
  url: '',
  id: '',
  type: '',
  autoplay: true,
  loop: true,
  controls: false,
  poster: ''
}


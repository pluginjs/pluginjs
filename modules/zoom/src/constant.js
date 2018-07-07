export const namespace = 'zoom'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  LOADINGSHOW: 'loadingShow',
  LOADINGHIDE: 'loadingHide',
  LOADINGERROR: 'loadingError',
  ENTER: 'enter',
  LEAVE: 'leave'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLE: '{namespace}-disable',
  CONTAINER: '{namespace}-container',
  ACTIVE: '{namespace}-active',
  LENS: '{namespace}-lens',
  TINT: '{namespace}-tint',
  LOADING: '{namespace}-loading',
  WINDOW: '{namespace}-window',
  WINDOWIMAGE: '{namespace}-windowImage',
  OVERLAY: '{namespace}-overlay',
  LENSIMAGE: '{namespace}-lensImage',
  OVERLAYCONTAINER: '{namespace}-overlayContainer'
}

export const methods = ['changePosition', 'destroy', 'enable', 'disable']

export const defaults = {
  theme: null,
  type: 'window', // lens   inner
  animation: true,
  level: 1, // 1.5 And 0.7
  // clickOpen: false,
  window: {
    clickOpen: false,
    height: '400',
    width: '400',
    borderSize: '1',
    borderColor: 'black',
    position: 1,
    offetY: 0,
    offetX: 0,
    lensSize: 200,
    lensBorderSize: 1,
    lensBorderColor: '',
    lensColor: '',
    lensOpacity: '',
    overlay: false,
    overlayColor: '',
    overlayOpacity: ''
  },
  lens: {
    color: '',
    opacity: '',
    size: 200,
    borderSize: '5',
    borderColor: '#fff',
    lensShape: 'round',
    flexWidth: false
  },
  templates: {
    loading() {
      return '<div class="{classes.LOADING}"></div>'
    },
    container() {
      return '<div class="{classes.CONTAINER}"></div>'
    },
    window() {
      return '<div class="{classes.WINDOW}"><div class="{classes.WINDOWIMAGE}"></div></div>'
    },
    lens() {
      return '<div class="{classes.LENS}"></div>'
    },
    lensImage() {
      return '<div class="{classes.LENSIMAGE}"></div>'
    },
    overlay() {
      return '<div class="{classes.OVERLAYCONTAINER}"><div class="{classes.OVERLAY}"></div></div>'
    }
  }
}


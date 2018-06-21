export const namespace = 'slider'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  SHOW: 'show',
  HIDE: 'hide'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}',
  THEME: '{namespace}--{theme}',
  ITEM: '{namespace}',
  BOX: '{namespace}-box',
  CARD: '{namespace}-card',
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  HIDDEN: '{namespace}-hidden'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'show',
  'hide',
  'goNext',
  'goPrev',
  'autoPlay',
  'setAutoPlayCycle',
  'setAnimation',
  'setSpecPage'
]

export const defaults = {
  animation: 'linear',
  arrowNameSpace: null,
  arrows: false,
  autoplay: false,
  direction: 'horizontal',
  dots: false,
  dotNameSpace: null,
  playcycle: 1500
}

export const dependencies = ['Hammer', 'dots', 'arrows']

export const translations = {
  en: {
    prev: 'Last page',
    next: 'Next page'
  },
  zh: {
    prev: '上一页',
    next: '下一页'
  }
}

export const info = { version: '0.0.1' }

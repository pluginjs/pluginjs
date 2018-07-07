export const namespace = 'scrollTop'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  JUMP: 'jump',
  HIDE: 'hide',
  SHOW: 'show'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  TRIGGER: '{namespace}',
  ANIMATION: '{namespace}-{animation}',
  ANIMATING: '{namespace}-animating',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show'
}

export const methods = ['jump', 'enable', 'disable', 'show', 'hide', 'destroy']

export const defaults = {
  trigger: null, // Set a custom triggering element. Can be an HTML string
  target: null, // Set a custom target element for scrolling to. Can be element or number
  distance: 200,
  duration: 1000,
  easing: 'linear',
  animation: 'fade', // fade, slide, none
  animationDuration: 500,

  mobile: {
    width: 768,
    distance: 100,
    duration: 1000,
    easing: 'easeInOutElastic',
    animation: 'slide', // fade, slide, none
    animationDuration: 200
  },

  theme: 'default',
  locale: 'en',
  localeFallbacks: true,
  throttle: undefined
}

export const dependencies = ['scroll']

export const translations = {
  en: { label: 'Scroll To Top' },
  zh: { label: '置顶' }
}


export const namespace = 'scrollable'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  HOVER: 'hover',
  HOVERED: 'hovered',
  SCROLL: 'scroll',
  SCROLLTOP: 'scrollTop',
  SCROLLEND: 'scrollEnd',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WARP: '{namespace}',
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  CONTENT: '{namespace}-content',
  CONTAINER: '{namespace}-container',
  BAR: '{namespace}-bar',
  BARHIDE: '{namespace}-bar-hide',
  ENABLED: '{namespace}-enabled',
  DISABLED: '{namespace}-disabled',
  DRAGGING: '{namespace}-dragging',
  HOVERING: '{namespace}-hovering',
  SCROLLING: '{namespace}-scrolling'
}

export const methods = [
  'scrollTo',
  'scrollBy',
  'enable',
  'disable',
  'destroy',
  'update'
]

export const defaults = {
  theme: null,

  contentSelector: null,
  containerSelector: null,

  direction: 'vertical', // vertical, horizontal, both, auto

  showOnHover: true,
  showOnBarHover: false,

  duration: 500,
  easing: 'ease-in', // linear, ease, ease-in, ease-out, ease-in-out

  responsive: true,
  throttle: 20,

  scrollbar: {}
}

export const dependencies = ['scrollbar']

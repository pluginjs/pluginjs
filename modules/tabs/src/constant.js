export const namespace = 'tabs'

export const events = {
  ACTIVE: 'active',
  UPDATE: 'update',
  LOADED: 'loaded',
  READY: 'ready',
  RESIZE: 'resize',
  ENABLE: 'enable',
  DISABLED: 'disabled',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  RESPONSIVE: '{namespace}-{responsiveMode}',
  NAVLABEL: '{namespace}-nav-label',
  NAVWRAP: '{namespace}-nav-wrap',
  DROPOPEN: '{namespace}-drop-open',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  NAV: '{namespace}-nav',
  CONTENT: '{namespace}-content',
  LOADING: '{namespace}-loading'
}

export const methods = [
  'update',
  'enable',
  'disabled',
  'destroy',
  'getTabs',
  'getPanes',
  'getCurrentPane',
  'getCurrentTab',
  'getIndex',
  'getSize',
  'next',
  'prev',
  'add',
  'remove',
  'append',
  'revert'
]

export const defaults = {
  theme: null,
  navSelector: null,
  contentSelector: '+',
  navPosition: null,
  initialIndex: 0,
  ajax: false,
  cached: false,
  history: false,
  historyAttr: 'id',
  keyboard: false,
  effect: 'fadeIn',
  duration: 400,
  event: 'click',
  position: 'topleft', // nav position: ['left','right','topleft','topright','topcenter','topjustify','bottomleft','bottomright','bottomcenter','bottomjustify']

  // Responsive
  breakpoint: null,
  navLabelSelector: null,
  navWrapSelector: null,
  navLabelTpl:
    '<a href="javascript:void(0)"><i class=\'icon-char pj-icon pj-icon-chevron-down\'></i>tabsss1</a>',
  navWrapTpl: '<div></div>',
  resizeReference: 'window', // 'self', 'window', class name, id name
  responsiveMode: 'drop', // drop, scroll

  // callback
  onInit: null,
  onReady: null
}

export const dependencies = ['Hammer', 'anime', 'whatwg-fetch']

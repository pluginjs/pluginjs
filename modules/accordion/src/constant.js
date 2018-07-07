export const namespace = 'accordion'

export const events = {
  READY: 'ready',
  OPEN: 'open',
  CLOSE: 'close',
  RESIZE: 'resize'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',

  RESPONSIVE: '{namespace}-responsive',
  HORIZONTAL: '{namespace}-horizontal',

  DROPDOWN: '{namespace}-dropdown',
  DROPDOWNLABEL: '{namespace}-dropdown-label',
  DROPDOWNLIST: '{namespace}-dropdown-list',
  DROPDOWNOPEN: '{namespace}-open',

  // components
  PANE: '{namespace}-pane',
  PANEHEADER: '{namespace}-pane-header',
  PANECONTENT: '{namespace}-pane-content',
  PANECONTENTINNER: '{namespace}-pane-content-inner'
}

export const methods = ['open', 'close']

export const defaults = {
  theme: null,
  panelSelector: null,
  initialIndex: 0,
  duration: 300,
  horizontal: false,
  multiple: false,
  ajax: false,

  // Responsive
  breakWidth: null,
  resizeReference: 'window',
  responsiveEffect: 'easeInQuad',
  dropdownLabelTpl: '<a href="javascript:void(0)"></a>',
  responsiveDuration: 300,

  // callback
  onReady: null
}

export const dependencies = ['Hammer', 'anime']


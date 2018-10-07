export const namespace = 'tooltip'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  HIDE: 'hide',
  HIDDEN: 'hidden',
  SHOW: 'show',
  SHOWN: 'shown',
  INSERTED: 'inserted'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  TOOLTIP: '{namespace}',
  TOOLTIPINNER: '{namespace}-inner',
  SHOW: '{namespace}-show',
  ARROW: '{namespace}-arrow',
  FADE: '{namespace}-fade',
  DISABLED: '{namespace}-disabled',
  PLACEMENT: '{namespace}-{placement}'
}

export const methods = [
  'show',
  'hide',
  'toggle',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null, // light, shadow
  animation: true,
  template() {
    return (
      '<div class="{classes.TOOLTIP} {custom}" role="tooltip">' +
      '<div class="{classes.TOOLTIPINNER}"></div>' +
      '<div class="{classes.ARROW}"></div>' +
      '</div>'
    )
  },
  trigger: 'click', // hover focus, click, manual
  hideOutClick: true, // When clicking outside of the tooltip, trigger hide event
  title: '', // Default title value if title attribute isn't present.
  delay: 0, // { "show": 500, "hide": 100 }
  html: false,
  selector: false, // If a selector is provided, popover objects will be delegated to the specified targets.
  placement: 'top', // ['auto','bottom', 'top', 'right', 'left'] and ['start', 'end'] can be combination, like 'bottom-start', 'left-end'. when use a single value, like 'bottom', means 'bottom-center'.
  offset: '0,2',
  container: false,
  fallbackPlacement: 'flip',
  boundary: 'scrollParent'
}

export const dependencies = ['Popper']

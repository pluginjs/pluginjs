export const namespace = 'dropdown'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  HIDE: 'hide',
  HIDED: 'hided',
  SHOW: 'show',
  SHOWN: 'shown',
  CHANGE: 'change',
  SELECT: 'select',
  TRIGGER: 'trigger'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  TRIGGRER: '{namespace}-trigger',
  REFERENCE: '{namespace}-reference',
  DROPDOWN: '{namespace}',
  INPUT: 'pj-input {namespace}-input',
  ITEM: '{namespace}-item',
  SHOW: '{namespace}-show',
  PLACEMENT: '{namespace}-on-{placement}',
  FOCUS: '{namespace}-focus',
  DISABLED: '{namespace}-disabled',
  ACITVE: '{namespace}-active',
  HIGHLIGHTED: '{namespace}-highlighted',
  SELECTED: '{namespace}-selected'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'show',
  'hide',
  'toggle',
  'update'
]

export const defaults = {
  theme: null,
  reference: null,
  target: '+', // dom selector to find content in the page, or '+' means adjacent siblings
  trigger: 'click', // focus, hover
  hideOnSelect: true,
  hideOutClick: true, // When clicking outside of the dropdown, trigger hide event
  keyboard: false,
  placement: 'bottom-start', // ['auto','bottom', 'top', 'right', 'left'] and ['start', 'end'] can be combination, like 'bottom-start', 'left-end'. when use a single value, like 'bottom', means 'bottom-center'.
  offset: '0,6px',
  flip: true,
  boundary: 'scrollParent', // viewport

  imitateSelect: false, // Behave like select
  value: null, // set initial select value, when imitateSelect is true
  itemValueAttr: 'data-value', // item tag name
  placeholder: 'Please Select',

  data: null, // json [{label: [string]}, ....]
  width: null, // number| string | object, when object, dropdown-panel = object.css('width')
  templates: {
    item() {
      return '<div class="{classes.ITEM}" {itemValueAttr}="{item.value}">{item.label}</div>'
    }
  }
}

export const dependencies = ['Popper']

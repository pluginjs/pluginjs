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
  SELECT: 'select'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  TRIGGRER: '{namespace}-trigger',
  REFERENCE: '{namespace}-reference',
  DROPDOWN: '{namespace}',
  ITEM: '{namespace}-item',
  ITEMDISABLED: '{namespace}-item-disabled',
  SHOW: '{namespace}-show',
  PLACEMENT: '{namespace}-on-{placement}',
  FOCUS: '{namespace}-focus',
  DISABLED: '{namespace}-disabled',
  ACITVE: '{namespace}-active',
  HIGHLIGHTED: '{namespace}-highlighted'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'show',
  'hide',
  'toggle',
  'selectByValue',
  'update'
]

export const defaults = {
  theme: null,
  reference: null,
  target: '+', // dom selector to find content in the page, or '+' means adjacent siblings, or 'false' when generate dropdown from data
  trigger: 'click', // focus, hover
  hideOnSelect: true,
  hideOutClick: true, // When clicking outside of the dropdown, trigger hide event
  keyboard: false,
  placement: 'bottom-start', // ['auto','bottom', 'top', 'right', 'left'] and ['start', 'end'] can be combination, like 'bottom-start', 'left-end'. when use a single value, like 'bottom', means 'bottom-center'.
  offset: '0,6px',
  flip: true,
  boundary: 'scrollParent', // viewport
  itemValueAttr: 'data-value',
  data: null,
  templates: {
    item(item) {
      if (item.disabled) {
        return '<div class="{classes.ITEM} {classes.ITEMDISABLED}" {itemValueAttr}="{item.value}">{item.label}</div>'
      }
      return '<div class="{classes.ITEM}" {itemValueAttr}="{item.value}">{item.label}</div>'
    }
  }
}

export const dependencies = ['Popper']

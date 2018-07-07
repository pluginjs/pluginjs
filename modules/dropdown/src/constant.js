export const namespace = 'dropdown'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  HIDE: 'hide',
  SHOW: 'show',
  CHANGE: 'change',
  CLICK: 'click',
  TRIGGER: 'trigger'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  INPUTMODE: '{namespace}-input',
  SELECTMODE: '{namespace}-select',
  ELEMENT: '{namespace}',
  LABEL: '{namespace}-label',
  ICON: '{namespace}-icon',
  ITEM: '{namespace}-item',
  SHOW: '{namespace}-show',
  MASK: '{namespace}-mask',
  WRAP: '{namespace}-wrap',
  PANEL: '{namespace}-panel',
  PANELWRAP: '{namespace}-panel-wrap',
  PANELONTOP: '{namespace}-panel-on-top',
  DISABLED: '{namespace}-disabled',
  FOCUS: '{namespace}-focus',
  ACITVE: '{namespace}-active',
  HOVER: '{namespace}-hover',
  INPUT: 'pj-input',
  LABELACTIVE: '{namespace}-label-active'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'show',
  'hide',
  'get',
  'set',
  'toggle',
  'update',
  'replaceByData',
  'appendByData',
  'setWidth'
]

export const defaults = {
  theme: null,
  panel: '+', // jquery selector to find content in the page, or '+' means adjacent siblings
  trigger: 'click', // focus, hover
  exclusive: true, // show exclusive true or false
  hideOnSelect: true,
  hideOutClick: true, // When clicking outside of the dropdown, trigger hide event
  keyboard: false,
  placement: 'bottom-start', // ['auto','bottom', 'top', 'right', 'left'] and ['start', 'end'] can be combination, like 'bottom-start', 'left-end'. when use a single value, like 'bottom', means 'bottom-center'.
  imitateSelect: false, // Behave like select
  inputLabel: false, // input with select
  placeholder: 'Please select',
  icon: false, // false or icon class, when imitateSelect is true
  select: null, // set initial select value, when imitateSelect is true
  itemValueAttr: 'value', // item tag name
  data: null, // json [{label: [string]}, ....]
  width: null, // number| string | object, when object, dropdown-panel = object.css('width')
  constraintToScrollParent: true,
  constraintToWindow: true,
  templates: {
    inputLabel() {
      return '<input class="{that.classes.LABEL}" placeholder="{that.options.placeholder}" />'
    },
    label() {
      return '<span class="{that.classes.LABEL}"></span>'
    },
    icon() {
      return '<i class="{that.classes.ICON} {icon}"></i>'
    },
    panel() {
      return '<ul></ul>'
    },
    item() {
      return '<li class="{that.classes.ITEM}" data-{that.options.itemValueAttr}="{tag}">{item.label}</li>'
    }
  }
}

export const dependencies = ['Popper']

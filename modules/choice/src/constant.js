export const namespace = 'choice'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  SELECT: 'select',
  UNSELECT: 'unselect'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}',
  ITEM: '{namespace}-item',
  DROPDOWN: '{namespace}-dropdown',
  DROPDOWNSHOW: '{namespace}-dropdown-show',
  TOGGLE: '{namespace}-toggle',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'select',
  'unselect',
  'get',
  'set',
  'val'
]

export const defaults = {
  theme: null,
  multiple: false,
  value: '',
  overflow: false,
  disabled: false,
  toggleTrigger: 'hover', // click
  toggleIcon: 'fa fa-caret-down',
  templates: {
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    item() {
      return '<button type="button" class="{classes.ITEM}" data-value="{value}">{item.label}</button>'
    },
    toggle() {
      return '<button type="button" class="{classes.ITEM} {classes.TOGGLE}" aria-haspopup="true" aria-expanded="false">Other &nbsp;<i class="{icon}" aria-hidden="true"></i></button>'
    },
    dropdown() {
      return '<div class="{classes.DROPDOWN}"></div>'
    }
  }
}

export const dependencies = ['Popper']

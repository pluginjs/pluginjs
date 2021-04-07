export const namespace = 'choice'
import { isString, isArray } from '@pluginjs/is'
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
  clickModal: false,
  modalTitle: 'Tips',
  modalContent: 'Are you sure? This will reset the saved color options to the preset',
  modalTheme: null,
  multiple: false,
  overflow: false,
  disabled: false,
  toggleTrigger: 'click', // click
  toggleIcon: 'pj-icon pj-icon-caret-down-mini',
  toggleText: 'Other &nbsp;',
  templates: {
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    item() {
      return '<button type="button" class="{classes.ITEM}" data-value="{value}">{item.label}</button>'
    },
    toggle() {
      return '<button type="button" class="{classes.ITEM} {classes.TOGGLE}" aria-haspopup="true" aria-expanded="false">{text}<i class="{icon}" aria-hidden="true"></i></button>'
    },
    dropdown() {
      return '<div class="{classes.DROPDOWN}"></div>'
    }
  },
  parse(value) {
    if (isString(value)) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return []
      }
    }
    return []
  },
  process(value) {
    if (value && isArray(value) && value.length !== 0) {
      return JSON.stringify(value)
    }
    return ''
  }
}

export const dependencies = ['Popper']

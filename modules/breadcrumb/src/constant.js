import { children, query } from '@pluginjs/dom'

export const namespace = 'breadcrumb'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  OVERFLOW: '{namespace}-{overflow}',
  ELEMENT: '{namespace}',
  TOGGLE: '{namespace}-toggle',
  DROPDOWN: '{namespace}-dropdown',
  DROPDOWNRIGHT: '{namespace}-dropdown-right',
  DROPDOWNITEM: '{namespace}-item',
  DROPDOWNITEMDISABLE: '{namespace}-item-disabled',
  ELLIPSIS: '{namespace}-ellipsis',
  DISABLED: '{namespace}-disabled',
  HIDDEN: '{namespace}-hidden'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  responsive: true,
  responsiveText: '...',
  overflow: 'left',
  ellipsisText: '&#8230;',

  getItems($parent) {
    return children($parent)
  },

  getItemLink($item) {
    return query('a', $item)
  },

  templates: {
    ellipsis() {
      return '<li class="{classes.ELLIPSIS}">{label}</li>'
    },
    dropdownItem() {
      return '<li class="{classes.DROPDOWNITEM}"><a href="{href}">{label}</a></li>'
    },
    dropdownItemDisable() {
      return '<li class="{classes.DROPDOWNITEM} {classes.DROPDOWNITEMDISABLE}"><a href="#">{label}</a></li>'
    },
    dropdown() {
      return (
        '<li class="{classes.DROPDOWN}">' +
        '<a href="javascript:void(0);" class="{classes.TOGGLE}" data-toggle="dropdown">{text}' +
        '</a>' +
        '</li>'
      )
    }
  }
}

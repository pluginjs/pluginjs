import { children, query, queryAll } from '@pluginjs/dom'

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
  TOGGLEICON: 'caret',
  DROPDOWN: 'dropdown',
  DROPDOWNMENU: 'dropdown-menu',
  DROPDOWNMENURIGHT: 'dropdown-menu-right',
  DROPDOWNITEM: '',
  DROPDOWNITEMDISABLE: 'disabled',
  ELLIPSIS: '{namespace}-ellipsis',
  HIDDEN: '{namespace}-hidden'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  responsive: true,
  overflow: 'left',
  ellipsisText: '&#8230;',

  getItems($parent) {
    return children($parent)
  },

  getItemLink($item) {
    return query('a', $item)
  },

  getDropdownMenu($dropdown) {
    return query(`.${this.classes.DROPDOWNMENU}`, $dropdown)
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
        '<a href="javascript:void(0);" class="{classes.TOGGLE}" data-toggle="dropdown">' +
        '<i class="{classes.TOGGLEICON}"></i>' +
        '</a>' +
        '<ul class="{classes.DROPDOWNMENU}"></ul>' +
        '</li>'
      )
    }
  }
}


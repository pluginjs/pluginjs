// import is from '@pluginjs/is'

export const namespace = 'select'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLED: 'disabled',
  DESTROY: 'destroy',
  LOAD: 'load',
  OPEN: 'open',
  CLOSE: 'close',
  CLICK: 'click',
  CHANGE: 'change',
  SELECTED: 'select',
  UNSELECTED: 'unselect',
  HIDE: 'hide'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}-wrap',
  MULTIPLE: '{namespace}-multiple',
  FILTERABLE: '{namespace}-filterable',
  DROPDOWNLIST: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  HASBADGE: '{namespace}-hpj-badge',
  BADGE: '{namespace}-badge',
  BADGECONTENT: '{namespace}-badge-content',
  BADGEDELETE: '{namespace}-badge-delete',
  LABEL: '{namespace}-label',
  LIST: '{namespace}-list',
  SUBLIST: '{namespace}-sublist',
  ITEM: '{namespace}-item',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  OPEN: '{namespace}-open',
  NOTFOUND: '{namespace}-not-found',
  DISABLED: '{namespace}-disabled',
  MARK: '{namespace}-mark',
  SELECTED: '{namespace}-selected',
  FOCUS: '{namespace}-focus',
  LOADING: '{namespace}-loading',
  ERROR: '{namespace}-error',
  HIDEICON: '{namespace}-hideIcon'
}

export const methods = [
  'get',
  'set',
  'val',
  'enable',
  'disable',
  'destroy',
  'removeData',
  'open',
  'close'
]

export const defaults = {
  theme: null,
  trigger: 'click', // 'hover' or 'click'
  offset: [0, 0], // set panel offset to trigger element
  icon: 'icon-char icon-chevron-down',
  multiple: false,
  clearable: false,
  filterable: false,
  closeAllButten: true,
  placeholder: 'Please select',
  notFoundText: 'Badge not found',
  selected: null, // item value, string or array
  data: null, // object or url string, take precedence
  keyboard: true,
  disabled: false,
  templates: {
    wrap() {
      return '<div class="{that.classes.WRAP}"></div>'
    },
    trigger() {
      return '<div class="{that.classes.TRIGGER}"></div>'
    },
    label() {
      return '<div class="{that.classes.LABEL}">{that.options.placeholder}</div>'
    },
    filterLabel() {
      return '<input placeholder="{that.options.placeholder}" class="{that.classes.LABEL}" />'
    },
    badge() {
      return '<div class="{that.classes.BADGE}" data-flag="{flag}"><span class="{that.classes.BADGECONTENT}">{label}</span><i class="{that.classes.BADGEDELETE} icon-close"></i></div>'
    },
    dropdown() {
      return '<div class="{that.classes.DROPDOWN}"></div>'
    },
    list() {
      return '<ul class="{that.classes.LIST}"></ul>'
    },
    sublist() {
      return '<ul class="{that.classes.SUBLIST}"></ul>'
    },
    group() {
      return '<li class="{that.classes.GROUP}"><span class="{that.classes.GROUPLABEL}">{group.label}</span></li>'
    },
    item() {
      return '<li class="{that.classes.ITEM}" data-value="{item.value}">{item.label}</li>'
    },
    notFound() {
      return '<div class="{that.classes.NOTFOUND}">{that.options.notFoundText}</div>'
    }
  },
  parse(value) {
    if (value) {
      return this.options.multiple ? value.split(',') : value
    }
    return this.options.multiple ? [] : ''
  },
  process(value) {
    if (value && !is.undefined(value)) {
      return is.array(value) ? value.join(',') : value
    }
    return ''
  }
}

export const dependencies = ['dropdown']


import { search } from '@pluginjs/match'
import { isString } from '@pluginjs/is'

export const namespace = 'iconPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  SELECT: 'select',
  CHANGE: 'change',
  HIDE: 'hide',
  HIDED: 'hided',
  SHOW: 'show',
  SHOWN: 'shown',
  CLEAR: 'clear',
  FILTER: 'filter'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ELEMENT: '{namespace}-element',
  TRIGGER: '{namespace}-trigger pj-input',
  LABEL: '{namespace}-label',
  WRAP: '{namespace}',
  SHOW: '{namespace}-show',
  DROPDOWN: '{namespace}-dropdown',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  GROUPHIDED: '{namespace}-group-hided',
  MAIN: '{namespace}-main',
  PACK: '{namespace}-pack',
  PACKHIDED: '{namespace}-pack-hided',
  ITEM: '{namespace}-item pj-dropdown-item',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FILTERABLE: '{namespace}-filterable',
  FILTER: '{namespace}-filter',
  EMPTY: '{namespace}-empty',
  NOTFOUND: '{namespace}-not-found',
  LOADING: '{namespace}-loading',
  ACTIONS: '{namespace}-actions',
  ACTION: '{namespace}-action',
  MANAGE: '{namespace}-manage',
  SWITCHER: '{namespace}-switcher',
  SWITCHERLABEL: '{namespace}-switcher-label',
  SWITCHERDROPDOWN: '{namespace}-switcher-dropdown'
}

export const methods = [
  'set',
  'get',
  'val',
  'clear',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  source: null,
  value: null,
  placeholder: true,
  clearable: true,
  manage: null,
  multiple: false,
  filterable: true,
  filter(item, query) {
    return search(query, item, {
      diacritics: false,
      punctuation: false,
      case: false,
      whitespaces: false,
      boundaries: false
    })
  },
  keyboard: true,
  dropdown: {
    placement: 'bottom' // top
  },
  tooltip: {
    trigger: 'hover'
  },
  templates: {
    dropdown() {
      return '<div class="{classes.DROPDOWN}"><div class="{classes.MAIN}"></div></div>'
    },
    filter() {
      return '<div class="{classes.FILTER}"><input type="text" autocomplete="off" spellcheck="false" placeholder="{placeholder}"></div>'
    },
    switcher() {
      return '<div class="{classes.SWITCHER} {classes.ACTION}"><div class="{classes.SWITCHERLABEL}">{label}</div><div class="{classes.SWITCHERDROPDOWN}"></div></div>'
    },
    manage() {
      return '<div class="{classes.MANAGE} {classes.ACTION}">{text}</div>'
    },
    label() {
      return '<div class="{classes.LABEL}">{placeholder}</div>'
    },
    pack() {
      return '<div class="{classes.PACK}" data-name="{pack.name}"></div>'
    },
    group() {
      return '<div class="{classes.GROUP}"><div class="{classes.GROUPLABEL}">{group}</div></div>'
    },
    item() {
      return '<div class="{classes.ITEM}" data-value="{value}" title="{label}">{icon}</div>'
    },
    icon() {
      return '<i class="{item.class} {item.prefix}{item.icon}"></i>'
    },
    selected() {
      return '{icon} <span>{value}</span>'
    }
  },
  parse(data) {
    if (isString(data)) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return null
      }
    }
    return null
  },
  process(data) {
    if (data && typeof data !== 'undefined' && data.length !== 0) {
      return JSON.stringify(data)
    }
    return ''
  }
}

export const translations = {
  en: {
    placeholderText: 'Select Icon',
    loadingText: 'loading..',
    notFoundText: 'No icons found',
    searchText: 'Search',
    manageText: 'Manage',
    swicherText: 'Packages'
  },
  zh: {
    placeholderText: '选择图标',
    loadingText: '加载中..',
    notFoundText: '无匹配图标',
    searchText: '搜索',
    manageText: '管理',
    swicherText: '图标集'
  }
}

export const dependencies = ['dropdown', 'tooltip']

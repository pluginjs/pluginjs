import { search } from '@pluginjs/match'
import { isString } from '@pluginjs/is'

export const namespace = 'svgPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  SELECT: 'select',
  UNSELECT: 'unselect',
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
  ITEMS: '{namespace}-items',
  ITEM: '{namespace}-item pj-dropdown-item',
  ITEMDISABLED: '{namespace}-item-disabled pj-dropdown-item-disabled',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FILTERABLE: '{namespace}-filterable',
  FILTER: '{namespace}-filter',
  NOTFOUND: '{namespace}-not-found',
  LOADING: '{namespace}-loading',
  MANAGE: '{namespace}-manage'
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
  filterable: true,
  filter(item, query) {
    const strings = [item.name]
    if (item.tags) {
      strings.concat(item.tags)
    }
    const rankings = strings.map(string => {
      return search(query, string, {
        diacritics: false,
        punctuation: false,
        case: false,
        whitespaces: false,
        boundaries: false
      })
    })
    return Math.max(...rankings)
  },
  keyboard: true,
  dropdown: {
    placement: 'bottom' // top
  },
  tooltip: {
    trigger: 'hover'
  },
  itemValue(item) {
    return item.name
  },
  itemLabel(item) {
    return `${item.svg} <span>${item.name}</span>`
  },
  templates: {
    dropdown() {
      return '<div class="{classes.DROPDOWN}"><div class="{classes.ITEMS}"></div></div>'
    },
    filter() {
      return '<div class="{classes.FILTER}"><input type="text" autocomplete="off" spellcheck="false" placeholder="{placeholder}"></div>'
    },
    manage() {
      return '<div class="{classes.MANAGE}">{text}</div>'
    },
    label() {
      return '<div class="{classes.LABEL}">{placeholder}</div>'
    },
    group() {
      return '<div class="{classes.GROUP}"><div class="{classes.GROUPLABEL}">{group.name}</div></div>'
    },
    item() {
      return '<div class="{classes.ITEM}" data-value="{value}" title="{value}">{item.svg}</div>'
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
    placeholderText: 'Select SVG',
    loadingText: 'loading..',
    notFoundText: 'No results found',
    searchText: 'search',
    manageText: 'Manage'
  },
  zh: {
    placeholderText: '选择 SVG 图标',
    loadingText: '加载中..',
    notFoundText: '无匹配数据',
    searchText: '搜索',
    manageText: '管理'
  }
}

export const dependencies = ['dropdown']

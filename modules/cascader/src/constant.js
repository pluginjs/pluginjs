import { search } from '@pluginjs/match'
import { isString, isArray } from '@pluginjs/is'

export const namespace = 'cascader'

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
  OPTION: '{namespace}-option pj-dropdown-item',
  OPTIONEXTENSIBLE: '{namespace}-option-extensible',
  OPTIONDISABLED: '{namespace}-option-disabled pj-dropdown-item-disabled',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FILTERABLE: '{namespace}-filterable',
  FILTER: '{namespace}-filter',
  NOTFOUND: '{namespace}-not-found',
  MENU: '{namespace}-menu',
  LOADING: '{namespace}-loading'
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
  filterable: false,
  filter(option, query) {
    return search(query, option.label, {
      diacritics: false,
      punctuation: false,
      case: false,
      whitespaces: false,
      boundaries: false
    })
  },
  keyboard: true,
  clearable: false,
  dropdown: {
    placement: 'bottom-start' // top
  },
  optionLabel(option) {
    return option.label
  },
  customLabel(labels) {
    return labels.join(' / ')
  },
  templates: {
    label() {
      return '<div class="{classes.LABEL}">{placeholder}</div>'
    },
    menu() {
      return '<div class="{classes.MENU}" data-level="{level}"></div>'
    },
    option() {
      return '<div class="{classes.OPTION}" data-value="{option.value}">{option.label}</div>'
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

export const translations = {
  en: {
    placeholderText: 'Please select',
    loadingText: 'loading..',
    notFoundText: 'No results found'
  },
  zh: {
    placeholderText: '请选择',
    loadingText: '加载中..',
    notFoundText: '无匹配数据'
  }
}

export const dependencies = ['dropdown']

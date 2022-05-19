import { search } from '@pluginjs/match'

export const namespace = 'imageSelector'

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
  TRIGGER: '{namespace}-trigger',
  INLINE: '{namespace}-inline',
  INLINEACTIVE: '{namespace}-inline-active',
  HOVER: '{namespace}-trigger-hover',
  TRIGGERIMAGE: '{namespace}-trigger-image',
  TRIGGERLABEL: '{namespace}-trigger-label',
  TRIGGERACTION: '{namespace}-trigger-action',
  LABEL: '{namespace}-label',
  WRAP: '{namespace}',
  SHOW: '{namespace}-show',
  CHANGE: '{namespace}-change',
  DROPDOWN: '{namespace}-dropdown',
  CONTENT: '{namespace}-dropdown-content',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  OPTION: '{namespace}-option',
  OPTIONITEM: '{namespace}-option pj-dropdown-item',
  OPTIONLABEL: '{namespace}-option-label',
  OPTIONIMAGE: '{namespace}-option-image',
  OPTIONDISABLED: '{namespace}-option-disabled pj-dropdown-item-disabled',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FILTERABLE: '{namespace}-filterable',
  FILTER: '{namespace}-filter',
  NOTFOUND: '{namespace}-not-found',
  LOADING: '{namespace}-loading'
}

export const methods = [
  'select',
  'unselect',
  'set',
  'get',
  'val',
  'clear',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  responsiveDropdownFull: false,
  inline: false,
  theme: null,
  source: null,
  placeholder: true,
  filterable: false,
  itemValueAttr: 'data-value',
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
  templates: {
    trigger() {
      return '<div class="{classes.TRIGGER}"><img class="{classes.TRIGGERIMAGE}" src="{option.image}" alt="{option.label}" /><span class="{classes.TRIGGERLABEL}">{option.label}</span><div class="{classes.TRIGGERACTION}"><i class="pj-icon pj-icon-edit"></i></div></div>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    inline() {
      return '<div class="{classes.INLINE}"></div>'
    },
    group() {
      return '<div class="{classes.GROUPLABEL}">{group.label}</div><div class="{classes.GROUP}"></div>'
    },
    option() {
      return '<div class="{classes.OPTIONITEM}" data-value="{option.value}"><img class="{classes.OPTIONIMAGE}" src="{option.image}" alt="{option.label}" /><span class="{classes.OPTIONLABEL}">{option.label}</span></div>'
    }
  },
  parse(value) {
    return value
  },
  process(value) {
    return value
  }
}

export const translations = {
  en: {
    placeholder: 'Add Image',
    loadingText: 'loading..',
    notFoundText: 'No results found'
  },
  zh: {
    placeholder: '添加图片',
    loadingText: '加载中..',
    notFoundText: '无匹配数据'
  }
}

export const dependencies = ['dropdown']

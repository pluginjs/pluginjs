export const namespace = 'svgPicker'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const typeClass = {
  TYPE: '{namespace}-type',
  TYPEWRAP: '{namespace}-type-wrap',
  TYPETITLE: '{namespace}-type-title',
  TYPEOPEN: '{namespace}-type-open',
  TYPEHIDE: '{namespace}-type-hide',
  TYPETIP: '{namespace}-type-tip'
}

export const searchClass = {
  SEARCH: '{namespace}-search',
  SEARCHING: '{namespace}-searching',
  SEARCHED: '{namespace}-searched',
  SEARCHCLOSE: '{namespace}-search-close',
  SEARCHOWNDATA: '{namespace}-search-data'
}

export const manageClass = {
  MANAGE: '{namespace}-manage',
  MANAGEICON: '{namespace}-manage-icon'
}

export const baseClass = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  TRIGGER: '{namespace}-trigger',
  WRAP: '{namespace}-wrap',
  PANEL: '{namespace}-panel',
  ICON: '{namespace}-icon',
  ICONWRAP: '{namespace}-icon-wrap',
  ICONHOVER: '{namespace}-icon-hover',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  EMPTY: '{namespace}-empty',
  ADD: '{namespace}-add'
}

export const classes = {
  ...baseClass,
  ...typeClass,
  ...searchClass,
  ...manageClass
}

export const methods = [
  'get',
  'set',
  'val',
  'enable',
  'disable',
  'destroy',
  'add'
]

export const defaults = {
  theme: null,
  locale: 'en',
  data: null,
  keyboard: false,
  placehoder: 'Select SVG',
  disabled: false,
  templates: {
    trigger() {
      return `<div class={classes.ELEMENT}><span class="pj-dropdown-trigger"></span><i class='{classes.ELEMENT}-switch pj-icon pj-icon-triangle-down-mini-solid'></i>
      </div>`
    },
    icon() {
      return `<li class={classes.ICON} data-value="{iconId}">{iconSvg}
      </li>`
    },
    type() {
      return `<div class="pj-dropdown-item {classes.TYPE}" data-value="{typeName}"><div class="{classes.TYPETITLE}"> <i class="pj-icon pj-icon-triangle-down-mini-solid">&nbsp;</i>{typeName}<span class='{classes.TYPETIP}'></span> </div><ul class="{classes.ICONWRAP}">{icons}</ul>
      </div>`
    },
    manage() {
      return `<div class={classes.MANAGE}><i class="{classes.MANAGEICON} pj-icon pj-icon-setting-1"></i> {manageText}
      </div>`
    },
    search() {
      return `<form class={classes.SEARCH} action="#"><i class='pj-icon pj-icon-search'></i><input type="text" name='search' placeholder={placeholder} /><i class='{classes.SEARCHCLOSE} pj-icon pj-icon-close'></i>
      </form>`
    },
    empty() {
      return `{emptyText}. <a class="{classes.ADD}" href="#">{emptyHrefText}
      </a>`
    }
  },
  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },
  parse(value) {
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return null
      }
    }
    return null
  }
}

export const dependencies = ['dropdown', 'scrollable']

export const translations = {
  en: {
    emptyText: 'Befor using SVG icons, you need add icons to "my collections"',
    emptyHrefText: 'Go add now',
    searchText: 'Search',
    manage: 'Manage My Collections',
    founded: 'founded'
  },
  zh: {
    emptyText: '在使用SVG图标之前，您需要添加图标到“我的收藏”',
    emptyHrefText: '去添加',
    searchText: '搜索',
    manage: '管理我的收藏',
    founded: '结果'
  }
}

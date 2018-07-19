import is from '@pluginjs/is'

export const namespace = 'iconPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const packageClass = {
  PACKAGE: '{namespace}-package',
  PACKAGESWRAP: '{namespace}-package-wrap',
  PACKAGETITLE: '{namespace}-package-title',
  PACKAGEBODY: '{namespace}-package-body',
  PACKAGEOPEN: '{namespace}-package-open',
  PACKAGEHIDE: '{namespace}-package-hide',
  PACKAGETIP: '{namespace}-package-tip'
}

export const searchClass = {
  SEARCH: '{namespace}-search',
  SEARCHING: '{namespace}-searching',
  SEARCHED: '{namespace}-searched',
  SEARCHCLOSE: '{namespace}-search-close',
  SEARCHLIST: '{namespace}-search-list',
  SEARCHOWNDATA: '{namespace}-search-data'
}

export const controllerClass = {
  CONTROLLER: '{namespace}-controller',
  SELECTOR: '{namespace}-selector',
  SELECTORPANEL: '{namespace}-selector-panel',
  MANAGE: '{namespace}-manage'
}

export const emptyClass = {
  EMPTY: '{namespace}-empty',
  EMPTYLINK: '{namespace}-empty-link'
}

export const baseClass = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  TRIGGER: '{namespace}-trigger',
  WRAP: '{namespace}-wrap',
  PANEL: '{namespace}-panel',
  CATEGORIES: '{namespace}-categories',
  CATEGORIESTITLE: '{namespace}-categories-title',
  ICON: '{namespace}-icon',
  ICONHOVER: '{namespace}-icon-hover',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled'
}

export const classes = {
  ...baseClass,
  ...packageClass,
  ...searchClass,
  ...controllerClass,
  ...emptyClass
}

export const methods = ['get', 'set', 'val', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  locale: 'en',
  manage: true,
  keyboard: true,
  placehoder: 'Choose a icon',
  disabled: false,
  templates: {
    empty() {
      return `<div class='{classes.EMPTY}'>{title}<a href="#" class='{classes.EMPTYLINK}'>{linkTitle}</a>
      </div>`
    },
    trigger() {
      return `<div class={trigger}><i class='{trigger}-switch icon-chevron-down'></i>
      </div>`
    },
    icon() {
      return `<li class={classes.ICON}><i class='{font} {iconName}' data-value={iconName}></i>
      </li>`
    },
    categories() {
      return `<div class='{classes.CATEGORIES} {categoriesName}'><div class={classes.CATEGORIESTITLE}>{title}</div>
      </div>`
    },
    controller() {
      return `<div class={classes.CONTROLLER}><div class={classes.SELECTOR}></div>
      </div>`
    },
    search() {
      return `<form class={classes.SEARCH} action="#"><i class='icon-search'></i><input type="text" name='search' placeholder={placeholder} /><i class='icon-close {classes.SEARCHCLOSE}'></i>
      </form>`
    }
  },
  process(value) {
    if (value && !is.undefined(value)) {
      return JSON.stringify(value)
    }
    return ''
  },
  parse(value) {
    if (value) {
      return JSON.parse(value.replace(/\'/g, '"'))/* eslint-disable-line */

    }

    return false
    // const values = value.split(':');
    // return {
    //   package: values[0],
    //   title: values[1]
    // };
  }
}

export const dependencies = ['tooltip', 'dropdown', 'scrollable']

export const translations = {
  en: {
    allIcons: 'All Icons',
    searchText: 'Search...',
    manage: 'manage',
    founded: 'founded',
    emptyTitle: 'Befor using icons, you need add icons. ',
    emptyLinkTitle: 'Go add now'
  },
  zh: {
    allIcons: '全部图标',
    searchText: '搜索...',
    manage: '管理',
    founded: '结果',
    emptyTitle: '使用图标之前，请先添加。',
    emptyLinkTitle: '现在添加'
  }
}

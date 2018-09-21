export const namespace = 'fontPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  SEARCHING: 'searching'
}

export const packageClass = {
  PACKAGE: '{namespace}-package',
  SOURCES: '{namespace}-sources',
  PACKAGETITLE: '{namespace}-package-title',
  PACKAGEOPEN: '{namespace}-package-open',
  PACKAGEHIDE: '{namespace}-package-hide'
}

export const searchClass = {
  SEARCH: '{namespace}-search',
  SEARCHING: '{namespace}-searching',
  SEARCHED: '{namespace}-searched',
  SEARCHLIST: '{namespace}-search-list',
  SEARCHREADY: '{namespace}-search-ready'
}

export const controllerClass = {
  ACTIONS: '{namespace}-actions',
  SWITCHER: '{namespace}-switcher',
  SELECTORPANEL: '{namespace}-selector-panel',
  ELSELECTOR: '{namespace}-selector-element',
  MANAGER: '{namespace}-manager'
}

export const baseClass = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}',
  THEME: '{namespace}--{theme}',
  TRIGGER: '{namespace}-trigger',
  FONT: '{namespace}-font',
  FONTFOCUS: '{namespace}-font-focus',
  PANEL: '{namespace}-panel',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  SOURCE: '{namespace}-source',
  SOURCEICON: '{namespace}-source-icon',
  ACTIVATED: '{namespace}-activated',
  FONTWRAP: '{namespace}-font-wrap',
  DROPDOWN: '{namespace}-dropdown'
}

export const emptyClass = {
  EMPTY: '{namespace}-empty',
  EMPTYLINK: '{namespace}-empty-link'
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
  // data: null,
  activated: null,
  disabled: false,
  // sources: null,
  manager: true,
  lazyNumber: 12, // [Number][Int]
  delay: 250,
  keyboard: true,
  placeholder: 'Select Font',
  // sourcelist: ['google', 'typekit', 'fontsquirrel', 'custom', 'system'],
  templates: {
    empty() {
      return `<div class='{classes.EMPTY}'>{title}<a href="#" class='{classes.EMPTYLINK}'>{linkTitle}</a>
      </div>`
    },
    trigger() {
      return `<div class="pj-input {classes.ELEMENT}"><span class="pj-dropdown-trigger"></span><div></div>
      </div>`
    },
    font() {
      return `<li class="{classes.FONT}" data-value="{fontName}">{fontName}
      </li>`
    },
    categories() {
      return `<div class='pj-dropdown-item {classes.PACKAGE}' data-value='{categoriesName}'><div class={classes.PACKAGETITLE}><i class='pj-icon pj-icon-triangle-right-mini-solid'></i>{title}</div>
      </div>`
    },
    actions() {
      return `<div class={classes.ACTIONS}><div class={classes.SWITCHER}><div class={classes.ELSELECTOR}></div></div>
      </div>`
    },
    search() {
      return `<form class={classes.SEARCH} action="#"><i class='{classes.SEARCH}-icon pj-icon pj-icon-search'></i><input type="text" name='search' placeholder={placeholder} /><i class="{classes.SEARCH}-close pj-icon pj-icon-remove"></i>
      </form>`
    }
  },
  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },
  parse(val) {
    return JSON.parse(val.replace(/\'/g, '"'))/* eslint-disable-line */
    // const values = val.split(':');
    // return {
    //   source: values[0],
    //   value: values[1]
    // };
  }
}

export const dependencies = ['dropdown', 'scrollable']

export const translations = {
  en: {
    searchText: 'Search',
    manager: 'manage',
    activatedFonts: 'activated',
    emptyTitle: 'Befor using font, you need add fonts. ',
    emptyLinkTitle: 'Go add now'
  },
  zh: {
    searchText: '搜索',
    manager: '管理',
    activatedFonts: '已选字体',
    emptyTitle: '使用字体之前，请先添加。',
    emptyLinkTitle: '现在添加'
  }
}

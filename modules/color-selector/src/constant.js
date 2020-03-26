/* eslint-disable no-empty-function */
/* eslint-disable no-undefined */
export const namespace = 'colorSelector'

export const events = {
  CHANGECOLOR: 'changeColor',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  OPENPANEL: 'openPanel',
  SWITCHMODULE: 'switchModule'
}

export const PREVIEWCLASS = {
  PREVIEW: '{namespace}-preview',
  PREVIEWCOLOR: '{namespace}-preview-color',
  PREVIEWBG: '{namespace}-preview-bg'
}

export const PANELCLASS = {
  PANEL: '{namespace}-panel',
  OPENPANEL: '{namespace}-open',
  OPENACTIVE: '{namespace}-input-active',
  DROPDOWN: '{namespace}-dropdown',

  PANELTRIGGER: '{namespace}-panel-swicher',
  PANELTRIGGERCOLLECTION: '{namespace}-panel-swicher-collection',
  PANELTRIGGERSOLID: '{namespace}-panel-swicher-solid',
  PANELTRIGGERGRADIENT: '{namespace}-panel-swicher-gradient',

  PANELCONTAINER: '{namespace}-panel-container',
  PANELCOLLECTION: '{namespace}-panel-collection',
  PANELSOLID: '{namespace}-panel-solid',
  PANELGRADIENT: '{namespace}-panel-gradient',

  SELECTED: '{namespace}-selected'
}

export const COLLECTIONCLASS = {
  FAVORITES: '{namespace}-favorites',
  SCHEME: '{namespace}-scheme',
  GROUPTITLE: '{namespace}-group-title',
  GROUPLIST: '{namespace}-group-list',
  COLLECTIONITEMWRAP: '{namespace}-collection-item-wrap',
  COLLECTIONITEM: '{namespace}-collection-item',
  MANAGE: '{namespace}-manage'
}

export const ACTIONCLASS = {
  OK: '{namespace}-ok'
}

export const BASECLASS = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  WRAP: '{namespace}',
  TRIGGER: '{namespace}-trigger',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  INPUT: '{namespace}-input',
  REMOVE: '{namespace}-remove',
  MASK: '{namespace}-mask'
}

export const classes = Object.assign(
  {},
  BASECLASS,
  PREVIEWCLASS,
  PANELCLASS,
  COLLECTIONCLASS,
  ACTIONCLASS
)

export const methods = ['enable', 'disable', 'get', 'set', 'val', 'destroy']

export const translations = {
  en: {
    ok: 'OK',
    cancel: 'Cancel',
    manage: 'Manage',
    collection: 'Collection',
    solid: 'Solid',
    gradient: 'Gradient'
  },
  zh: {
    ok: 'DONE',
    cancel: '取消',
    manage: '管理',
    collection: '收藏',
    solid: '纯色',
    gradient: '渐变'
  }
}

export const defaults = {
  theme: null,
  locale: 'en',
  placeholder: 'choose color',
  responsiveDropdownFull: false,
  clearable: false,
  gradient: true,
  data: null, // colors in the scheme and your favorite colors.  example: {scheme:{'Primary':'#55a4f2','fontColor':'#ccc','bgColor':'#f2a654','borderColor':'#f1f1f1'},favorite:['red':'red','brown':'brown','lightblue':'lightblue','green':'green']}
  manageButton: true,
  manage() {},
  dropdown: {
    placement: 'bottom-start'
  },
  templates: {
    wrap() {
      return '<div class="{class}"></div>'
    },
    preview() {
      return `<div class="{classes.PREVIEW}">
      <span class="{classes.PREVIEWCOLOR}"></span>
      <span class="{classes.PREVIEWBG}"></span>
            </div>`
    },
    remove() {
      return '<i class="{classes.REMOVE} pj-icon pj-icon-remove"></i>'
    },
    panel() {
      return `<div class='{classes.DROPDOWN}'>
      <div class='{classes.PANELTRIGGER}'></div>
      <div class='{classes.PANELCONTAINER}'></div>
    </div>`
    },
    collectionTrigger() {
      return '<i class="{class}" data-type="collection"></i>'
    },
    solidTrigger() {
      return '<i class="{class}" data-type="solid"></i>'
    },
    gradientTrigger() {
      return '<i class="{class}" data-type="gradient"></i>'
    },
    moduleWrap() {
      return '<div class="{classes.wrapClassName}"><input type="text" class="{classes.colorClassName}"></div>'
    },
    scheme() {
      return '<div class="{classes.SCHEME}"></div>'
    },
    manage() {
      return '<div class="{classes.MANAGE}"><i class="pj-icon pj-icon-setting"></i>{manageText}</div>'
    },
    collectionItem() {
      return '<span class="{classes.COLLECTIONITEM}"></span>'
    },
    ok() {
      return '<button type="button" class="{class} pj-btn pj-btn-xs pj-btn-outline">{text}</button>'
    }
  },
  process(data) {
    return JSON.stringify(data)
  },
  parse(val) {
    if (val) {
      // const solid = new RegExp('^(#|rgb|rgba)', 'gi')
      const gradient = new RegExp('^((linear|radial)-gradient)', 'gi')

      if (val.match(gradient)) {
        return {
          module: 'gradient',
          color: val
        }
      }

      // if (val.match(solid)) {
      //   return {
      //     module: 'solid',
      //     color: val
      //   }
      // }

      return {
        module: 'solid',
        color: val
      }
    }
    return undefined
  }
}

export const dependencies = ['Popper', 'dropdown', 'color', 'tooltip']

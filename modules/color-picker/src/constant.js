/* eslint-disable no-empty-function */
/* eslint-disable no-undefined */
export const namespace = 'colorPicker'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  OPENPANEL: 'openPanel',
  // SATURATIONMOVE: 'saturationMove',
  // ALPHAMOVE: 'alphaMove',
  // HUEMOVE: 'hueMove',
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

export const SOLIDCLASS = {
  SOLIDHANDLE: '{namespace}-solid-handle',
  SOLIDPRIMARY: '{namespace}-solid-primary',
  SOLIDACTION: '{namespace}-solid-action',
  SOLIDHISTORY: '{namespace}-solid-history',
  SOLIDDONE: '{namespace}-solid-done'
}

export const GRADIENTCLASS = {
  GRADIENTHANDLE: '{namespace}-gradient-handle',
  GRADIENTPRIMARY: '{namespace}-gradient-primary',
  GRADIENTACTION: '{namespace}-gradient-action',
  GRADIENTHISTORY: '{namespace}-gradient-history',
  GRADIENTDONE: '{namespace}-gradient-done',
  GRADIENTBAR: '{namespace}-gradient-bar',
  GRADIENTBARVIEW: '{namespace}-gradient-bar-view',
  GRADIENTCONTENT: '{namespace}-gradient-content',
  GRADIENTREMOVE: '{namespace}-gradient-remove',
  GRADIENTREMOVEACTIVE: '{namespace}-gradient-remove-active',
  GRADIENTMODE: '{namespace}-gradient-mode',

  MARKER: '{namespace}-marker',
  MARKERACTIVE: '{namespace}-marker-active',
  WHEEL: '{namespace}-wheel',
  WHEELHANDLE: '{namespace}-wheel-handle',
  WHEELANGLE: '{namespace}-wheel-angle'
}
export const CONTRASTCLASS = {
  CONTRAST: '{namespace}-contrast',
  CONTRASTNOW: '{namespace}-contrast-now',
  CONTRASTPREV: '{namespace}-contrast-prev'
}

export const HISTORYCLASS = {
  HISTORY: '{namespace}-history',
  HISTORYITEM: '{namespace}-history-item',
  HISTORYITEMEMPTY: '{namespace}-history-item-empty'
}
export const COLLECTIONCLASS = {
  FAVORITES: '{namespace}-favorites',
  SCHEME: '{namespace}-scheme',
  GROUPTITLE: '{namespace}-group-title',
  GROUPLIST: '{namespace}-group-list',
  COLLECTIONITEM: '{namespace}-collection-item',
  MANAGE: '{namespace}-manage',
  COLLECTIONSCROLLWRAP: '{namespace}-collection-scrollwrap'
}

export const ACTIONCLASS = {
  CANCEL: '{namespace}-cancel',
  OK: '{namespace}-ok'
}

export const PALETTECLASS = {
  POINTER: '{namespace}-pointer',
  ALPHA: '{namespace}-alpha',
  HUE: '{namespace}-hue',
  SATURATION: '{namespace}-saturation'
}

export const BASECLASS = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  WRAP: '{namespace}',
  TRIGGER: '{namespace}-trigger',
  DISABLED: '{namespace}-disabled',
  INPUT: '{namespace}-input',
  REMOVE: '{namespace}-remove',
  MASK: '{namespace}-mask'
}

export const HEXCLASS = {
  NAMESPACE: `pj-${namespace}`,
  HEX: '{namespace}-hex',
  HEXMODE: '{namespace}-hex-mode',
  HEXANGLE: '{namespace}-hex-angle',
  HEXBOX: '{namespace}-hex-box',
  HEXUNIT: '{namespace}-hex-unit'
}

export const classes = Object.assign(
  {},
  HEXCLASS,
  BASECLASS,
  PREVIEWCLASS,
  PANELCLASS,
  SOLIDCLASS,
  CONTRASTCLASS,
  HISTORYCLASS,
  COLLECTIONCLASS,
  PALETTECLASS,
  ACTIONCLASS,
  GRADIENTCLASS
)

export const methods = ['enable', 'disable', 'get', 'set', 'update']

export const translations = {
  en: {
    ok: 'OK',
    cancel: 'Cancel',
    manage: 'Manage',
    collection: 'Collection',
    solid: 'Solid',
    gradient: 'Gradient',
    colorInScheme: 'COLORS IN SCHEME',
    myColors: 'MY COLORS'
  },
  zh: {
    ok: 'DONE',
    cancel: '取消',
    manage: '管理',
    collection: '收藏',
    solid: '纯色',
    gradient: '渐变',
    colorInScheme: '颜色格式',
    myColors: '我的颜色'
  }
}

export const defaults = {
  theme: null,
  locale: 'en',
  // search: true,
  // collection: true,
  placeholder: 'choose color',
  module: ['collection', 'solid', 'gradient'], // 'collection', 'solid', 'gradient'
  solidMode: 'full', // 'full' , 'defalut' , 'sample'
  solidModule: {
    saturation: true,
    hue: true,
    alpha: true,
    hex: true
  },
  gradientMode: 'linear', // 'linear', 'radial'
  defaultColor: '#000',
  data: null, // colors in the scheme and your favorite colors.  example: {scheme:{'Primary':'#55a4f2','fontColor':'#ccc','bgColor':'#f2a654','borderColor':'#f1f1f1'},favorite:['red':'red','brown':'brown','lightblue':'lightblue','green':'green']}
  color: {
    format: false,
    alphaConvert: {
      // or false will disable convert
      RGB: 'RGBA',
      HSL: 'HSLA',
      HEX: 'RGBA',
      NAMESPACE: 'RGBA'
    },
    shortenHex: false,
    hexUseName: false,
    reduceAlpha: true,
    nameDegradation: 'HEX',
    invalidValue: '',
    zeroAlphaAsTransparent: true
  },
  manage() {},
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
    // collectionTrigger() {
    //   return '<i class="{class} pj-icon pj-icon-star-solid" data-type="collection"></i>'
    // },
    // solidTrigger() {
    //   return '<i class="{class} pj-icon pj-icon-gradient-solid" data-type="solid"></i>'
    // },
    // gradientTrigger() {
    //   return '<i class="{class} pj-icon pj-icon-gradient" data-type="gradient"></i>'
    // },
    moduleWrap() {
      return '<div class="{class}"></div>'
    },
    collection() {
      return `<div class='{classes.SCHEME}'><ul class='{classes.GROUPLIST}'></ul></div>
        <div class='{classes.MANAGE}'><i class='pj-icon pj-icon-setting-1'></i>{manageText}</div>`
    },
    collectionItem() {
      return '<li class="{classes.COLLECTIONITEM}"></li>'
    },
    content() {
      return `<div class='{handle}'></div>
        <div class='{primary}'></div>
        <div class='{action}'></div>
        <div class='{history}'></div>
        <div class='{done}'></div>`
    },
    cancel() {
      return '<button type="button" class="{class} pj-btn pj-btn-xs pj-btn-outline">{text}</button>'
    },
    ok() {
      return '<button type="button" class="{class} pj-btn pj-btn-xs pj-btn-outline">{text}</button>'
    },
    contrast() {
      return '<div class="{class}"><span class="{now}"></span><span class="{prev}"></span></div>'
    },
    history() {
      return '<div class="{classes.HISTORY}"></div>'
    },
    alpha() {
      return '<div class="{classes.ALPHA}"></div>'
    },
    hue() {
      return '<div class="{classes.HUE}"></div>'
    },
    hex() {
      return '<div class="{classes.HEX}"></div>'
    },
    saturation() {
      return '<div class="{classes.SATURATION}"></div>'
    },
    gradient() {
      return '<div class="{class}"></div>'
    },
    angles() {
      return '<input class="{class} pj-input" type="number"/>'
    }
  },
  process(data, module) {
    return JSON.stringify(data[module])
  },
  parse(val) {
    if (val) {
      const solid = new RegExp('^(#|rgb|rgba)', 'gi')
      const gradient = new RegExp('^((linear|radial)-gradient)', 'gi')

      if (val.match(solid)) {
        return {
          module: 'solid',
          color: val
        }
      }

      if (val.match(gradient)) {
        return {
          module: 'gradient',
          color: val
        }
      }

      return {
        module: 'collection',
        color: val
      }
    }
    return undefined
  }
}

export const dependencies = [
  'Popper',
  'dropdown',
  'color',
  'tooltip',
  'scrollable',
  'scrollbar'
]

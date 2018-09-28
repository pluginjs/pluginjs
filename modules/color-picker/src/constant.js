export const namespace = 'colorPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  UPDATE: 'update',
  CHANGE: 'change'
}

export const PANELCLASS = {
  NAMESPACE: `pj-${namespace}`,
  HANDLE: '{namespace}-handle',
  PRIMARY: '{namespace}-primary',
  ACTION: '{namespace}-action',
  HISTORY: '{namespace}-history',
  CONTROL: '{namespace}-control'
}

export const BASECLASS = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  TRIGGER: '{namespace}-trigger',
  DISABLED: '{namespace}-disabled',
  INPUT: '{namespace}-input',
  PANEL: '{namespace}-panel',
  REMOVE: '{namespace}-remove',
  MASK: '{namespace}-mask',
  SAVE: '{namespace}-save'
}

export const PREVIEWCLASS = {
  PREVIEW: '{namespace}-preview',
  PREVIEWCOLOR: '{namespace}-preview-color',
  PREVIEWBG: '{namespace}-preview-bg'
}

export const PALETTECLASS = {
  POINTER: '{namespace}-pointer',
  ALPHA: '{namespace}-alpha',
  HUE: '{namespace}-hue',
  SATURATION: '{namespace}-saturation'
}

export const HEXCLASS = {
  NAMESPACE: `pj-${namespace}`,
  HEX: '{namespace}-hex',
  HEXMODE: '{namespace}-hex-mode',
  HEXANGLE: '{namespace}-hex-angle',
  HEXBOX: '{namespace}-hex-box',
  HEXUNIT: '{namespace}-hex-unit'
}

export const HISTORYCLASS = {
  HISTORY: '{namespace}-history',
  HISTORYITEM: '{namespace}-history-item',
  HISTORYITEMEMPTY: '{namespace}-history-item-empty'
}

export const classes = Object.assign(
  {},
  HEXCLASS,
  BASECLASS,
  PREVIEWCLASS,
  // PANELCLASS,
  PANELCLASS,
  // CONTRASTCLASS,
  HISTORYCLASS,
  // COLLECTIONCLASS,
  PALETTECLASS
  // ACTIONCLASS,
  // GRADIENTCLASS
)

export const methods = ['enable', 'disable', 'destroy']

export const translations = {
  en: {
    ok: 'OK'
  },
  zh: {
    ok: 'DONE'
  }
}

export const defaults = {
  theme: null,
  locale: 'en',
  placeholder: 'choose color',
  // disabled: true,
  displayMode: true,
  module: {
    saturation: true,
    hue: true,
    alpha: true,
    hex: true,
    history: true
  },
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
  templates: {
    wrap() {
      return '<div class="{classes.NAMESPACE}"></div>'
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
      return `<div class='{classes.PANEL}'>
        <div class='{classes.PRIMARY}'></div>
        <div class='{classes.HEX}'></div>
        <div class='{classes.HISTORY}'></div>
        <div class='{classes.CONTROL}'></div>
    </div>`
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
    save() {
      return '<button type="button" class="{classes.SAVE} pj-btn pj-btn-xs pj-btn-outline">{text}</button>'
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

export const dependencies = ['dropdown', 'color']

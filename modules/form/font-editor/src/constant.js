import is from '@pluginjs/is'
/* eslint no-empty-function: "off" */
export const namespace = 'fontEditor'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  ACTIVE: '{namespace}-active',
  HOVER: '{namespace}-hover',
  EXSIT: '{namespace}-exsit',
  EMPTY: '{namespace}-empty',
  EXPAND: '{namespace}-expand',
  EXPANDPANEL: '{namespace}-expand-panel',
  EXPANDCONTROL: '{namespace}-expand-control',
  EXPANDCANCEL: '{namespace}-expand-cancel',
  EXPANDSAVE: '{namespace}-expand-save',
  INHERIT: '{namespace}-inherit'
}

export const methods = [
  'val',
  'set',
  'get',
  'clear',
  'setTextDecoration',
  'setTextTranform',
  'setTextAlign',
  'setFontStyle',
  'setFontWeight',
  'setFontFamily',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  disabled: false,
  fontFamily: {
    value: 'inherit',
    values: {
      Arial: 'Arial',
      Bpreplay: 'Bpreplay',
      Cambira: 'Cambira',
      Gabriola: 'Gabriola',
      inherit: 'inherit'
    },
    template() {
      return (
        '<div class="{namespace}-fontFamily">' +
        '<span class="{namespace}-fontFamily-title">{typeface}</span>' +
        '<div class="{namespace}-fontFamily-content">' +
        '<div class="{fontFamilyNamespace} {namespace}-fontFamily-dropdown"><i class="asIcon-caret-down"></i></div>' +
        '<ul>' +
        '</ul>' +
        '</div>' +
        '</div>'
      )
    }
  },
  fontWeight: {
    value: 'inherit',
    values: ['inherit', 'bold', '400', '500', '600', '700'],
    template() {
      return (
        '<div class="{namespace}-fontWeight">' +
        '<span class="{namespace}-fontWeight-title">{weight}</span>' +
        '<div class="{namespace}-fontWeight-content">' +
        '<div class="{fontWeightNamespace} {namespace}-fontWeight-dropdown"><i class="asIcon-caret-down"></i></div>' +
        // '<ul>' +
        // '<li>inherit</li>' +
        // '<li>bold</li>' +
        // '<li>400</li>' +
        // '<li>500</li>' +
        // '<li>600</li>' +
        // '<li>700</li>' +
        // '</ul>' +
        '</div>' +
        '</div>'
      )
    }
  },
  fontSize: {
    // defaultValue: 'inherit',
    value: 'inherit',
    unit: 'px',
    units: ['inherit', 'px', 'em', 'rem'],
    min: 0,
    max: 100,
    step: 2,
    template() {
      return (
        '<div class="{namespace}-fontSize">' +
        '<span class="{namespace}-fontSize-title">{fontSize}</span>' +
        '<div class="{namespace}-fontSize-content">' +
        '<div class="{fontSizeNamespace} {namespace}-fontSize-range"></div>' +
        '</div>' +
        '</div>'
      )
    }
  },
  lineHeight: {
    value: 'inherit',
    unit: 'em',
    units: ['inherit', 'px', 'em', 'rem'],
    min: 1,
    max: 10,
    step: 0.5,
    template() {
      return (
        '<div class="{namespace}-lineHeight">' +
        '<span class="{namespace}-lineHeight-title">{lineHeight}</span>' +
        '<div class="{namespace}-lineHeight-content">' +
        '<div class="{lineHeightNamespace} {namespace}-lineHeight-range"></div>' +
        // '<div class="{namespace}-lineHeight-value">1</div>' +
        '</div>' +
        '</div>'
      )
    }
  },
  textAlign: {
    value: 'left',
    values: ['left', 'center', 'right'],
    template() {
      return (
        '<ul class="{namespace}-decorations">' +
        '<li class="{namespace}-textAlign icon-align-left"></li>' +
        '<li class="{namespace}-textAlign icon-align-center"></li>' +
        '<li class="{namespace}-textAlign icon-align-right"></li>' +
        '</ul>'
      )
    }
  },
  fontStyle: {
    value: 'normal',
    values: ['italic', 'normal'],
    template() {
      return '<li class="{namespace}-fontStyle icon-imitation-italics"></li>'
    }
  },
  textTransform: {
    value: 'none',
    values: ['uppercase', 'lowercase', 'capitalize'],
    template() {
      return (
        '<li class="{namespace}-textTransform icon-all-caps"></li>' +
        '<li class="{namespace}-textTransform icon-all-lowercase"></li>' +
        '<li class="{namespace}-textTransform icon-small-caps"></li>'
      )
    }
  },
  textDecoration: {
    value: 'none',
    values: ['underline', 'line-through'],
    template() {
      return (
        '<li class="{namespace}-textDecoration icon-underline"></li>' +
        '<li class="{namespace}-textDecoration icon-line-through"></li>'
      )
    }
  },
  template() {
    return (
      '<div class="{namespace}">' +
      '<div class="{namespace}-initial">' +
      '<i>T</i>{addTypography}' +
      '</div>' +
      '<div class="{namespace}-info">' +
      '<i>T</i>' +
      '<div class="{namespace}-info-font"><span class="{namespace}-info-font-name">{fontFamily}</span><span class="{namespace}-info-font-sub"></span></div>' +
      '<div class="{namespace}-info-change"><i class="{namespace}-info-edit icon-pencil-square"></i><i class="{namespace}-info-remove icon-trash"></i></div>' +
      '</div>' +
      '<div class="{namespace}-expand-panel">' +
      '<div class="{namespace}-expand-control"><button type="button" class="{namespace}-expand-cancel pj-btn pj-btn-transparent">Cancel</button><button type="button" class="{namespace}-expand-save pj-btn pj-btn-primary">Save</button></div>' +
      '</div>' +
      '</div>'
    )
  },
  process(value) {
    if (value && !is.undefined(value)) {
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
  },
  onChange() {},
  onClick() {}
}

export const dependencies = ['dropdown', 'range', 'pop-dialog']

export const translations = {
  en: {
    addTypography: 'Add Typography',
    fontFamily: 'Font Family',
    change: 'Change',
    typeface: 'Typeface',
    fontSize: 'Font Size',
    lineHeight: 'Line Height',
    weight: 'Weight'
  },
  zh: {
    addTypography: '添加排版',
    fontFamily: '字体',
    change: '更改',
    typeface: '风格',
    fontSize: '字号',
    lineHeight: '行高',
    weight: '字重'
  }
}

export const info = { version: '0.2.3' }

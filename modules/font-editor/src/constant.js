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
  HOVER: '{namespace}-trigger-hover',
  EXSIT: '{namespace}-exsit',
  WRITE: '{namespace}-write',
  // field
  FIELD: '{namespace}-field {namespace}-{field}',
  FIELDTITLE: '{namespace}-field-title',
  FIELDCONTENT: '{namespace}-field-content',

  SHOW: '{namespace}-show',
  CONTROL: '{namespace}-control',
  CANCEL: '{namespace}-cancel',
  SAVE: '{namespace}-save',
  INHERIT: '{namespace}-inherit',
  TRIGGERACTION: '{namespace}-trigger-action',
  EDITACTION: '{namespace}-trigger-action-edit',
  REMOVEACTION: '{namespace}-trigger-action-remove',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  FILLCONTENT: '{namespace}-fill-content',
  FILLCONTENTNAME: '{namespace}-fill-content-name',
  FILLCONTENTSUB: '{namespace}-fill-content-sub',
  FONTSIZERANGE: '{namespace}-fontSize-range',
  LINEHEIGHTRANGE: '{namespace}-lineHeight-range',
  // textalign
  DECORATIONS: '{namespace}-decorations',
  TEXTALIGN: '{namespace}-textAlign',
  // fontstyle
  FONTSTYLE: '{namespace}-fontStyle',
  // texttransform
  TEXTTRANSFORM: '{namespace}-textTransform',
  // textDecoration
  TEXTDECORATION: '{namespace}-textDecoration',
  // dropdown
  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  OPENDISABLE: '{namespace}-open-disabled',
  SELECTTRIGGER: '{namespace}-select-trigger'
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
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{typeface}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.SELECTTRIGGER}" />' +
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
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{weight}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.SELECTTRIGGER}" />' +
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
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{fontSize}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<div class="{classes.FONTSIZERANGE}"></div>' +
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
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{lineHeight}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<div class="{classes.LINEHEIGHTRANGE}"></div>' +
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
        '<ul class="{classes.DECORATIONS}">' +
        '<li class="{classes.TEXTALIGN} pj-icon pj-icon-align-left"></li>' +
        '<li class="{classes.TEXTALIGN} pj-icon pj-icon-align-center"></li>' +
        '<li class="{classes.TEXTALIGN} pj-icon pj-icon-align-right"></li>' +
        '</ul>'
      )
    }
  },
  fontStyle: {
    value: 'normal',
    values: ['italic', 'normal'],
    template() {
      return '<li class="{classes.FONTSTYLE} pj-icon pj-icon-font"></li>'
    }
  },
  textTransform: {
    value: 'none',
    values: ['uppercase', 'lowercase', 'capitalize'],
    template() {
      return (
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-uppercase"></li>' +
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-lowercase"></li>' +
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-capitalize"></li>'
      )
    }
  },
  textDecoration: {
    value: 'none',
    values: ['underline', 'line-through'],
    template() {
      return (
        '<li class="{classes.TEXTDECORATION} pj-icon pj-icon-underline"></li>' +
        '<li class="{classes.TEXTDECORATION} pj-icon pj-icon-line-through"></li>'
      )
    }
  },
  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '<div class="{classes.TRIGGER}">' +
      '<div class="{classes.EMPTY}">' +
      '<i>T</i>{addTypography}' +
      '</div>' +
      '<div class="{classes.FILL}">' +
      '<i>T</i>' +
      '<div class="{classes.FILLCONTENT}"><span class="{classes.FILLCONTENTNAME}">{fontFamily}</span><span class="{classes.FILLCONTENTSUB}"></span></div>' +
      '</div>' +
      '<div class="{classes.TRIGGERACTION}"><i class="{classes.EDITACTION} pj-icon pj-icon-edit"></i><i class="{classes.REMOVEACTION} pj-icon pj-icon-trash"></i></div>' +
      '</div>' +
      '<div class="{classes.DROPDOWN}">' +
      '<div class="{classes.CONTROL}"><button type="button" class="{classes.CANCEL} pj-btn pj-btn-transparent">Cancel</button><button type="button" class="{classes.SAVE} pj-btn pj-btn-primary">Save</button></div>' +
      '</div>' +
      '</div>'
    )
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

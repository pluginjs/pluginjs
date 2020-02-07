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
  SELECTTRIGGER: '{namespace}-select-trigger',
  FONTPICKER: '{namespace}-fontPicker'
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
  dropdown: {
    theme: 'dafault',
    placement: 'bottom-start'
  },
  fontFamily: {
    value: { source: 'system', font: 'Arial' },
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{typeface}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.FONTPICKER}" />' +
        '</div>' +
        '</div>'
      )
    }
  },
  fontWeight: {
    value: '',
    values: [
      'normal',
      'bold',
      'bolder',
      'lighter',
      'inherit',
      '300',
      '400',
      '500',
      '600'
    ],
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
    value: '',
    values: ['left', 'center', 'right'],
    template() {
      return (
        '<ul class="{classes.DECORATIONS}">' +
        '<li class="{classes.TEXTALIGN} pj-icon pj-icon-align-left" title="{textStart}" ></li>' +
        '<li class="{classes.TEXTALIGN} pj-icon pj-icon-align-center" title="{textCenter}"></li>' +
        '<li class="{classes.TEXTALIGN} pj-icon pj-icon-align-right" title="{textEnd}"></li>' +
        '</ul>'
      )
    }
  },
  fontStyle: {
    value: '',
    values: ['italic', 'normal'],
    template() {
      return '<li class="{classes.FONTSTYLE} pj-icon pj-icon-font"  title="{font}"></li>'
    }
  },
  textTransform: {
    value: '',
    values: ['uppercase', 'lowercase', 'capitalize'],
    template() {
      return (
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-uppercase" title="{uppercase}"></li>' +
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-lowercase" title="{lowercase}"></li>' +
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-capitalize" title="{capitalize}"></li>'
      )
    }
  },
  textDecoration: {
    value: '',
    values: ['underline', 'line-through'],
    template() {
      return (
        '<li class="{classes.TEXTDECORATION} pj-icon pj-icon-underline" title="{underLine}"></li>' +
        '<li class="{classes.TEXTDECORATION} pj-icon pj-icon-line-through" title="{lineThrough}"></li>'
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
    underLine: 'underline',
    lineThrough: 'line-through',
    font: 'font',
    textStart: 'text-start',
    textEnd: 'text-end',
    textCenter: 'text-center',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    addTypography: 'Add Typography',
    fontFamily: 'Font Family',
    change: 'Change',
    typeface: 'Typeface',
    fontSize: 'Font Size',
    lineHeight: 'Line Height',
    weight: 'Weight'
  },
  zh: {
    underLine: '下划线',
    lineThrough: '删除线',
    font: '字形',
    textStart: '上移',
    textEnd: '下移',
    textCenter: '水平',
    uppercase: '大写',
    lowercase: '小写',
    capitalize: '首位大写',
    addTypography: '添加排版',
    fontFamily: '字体',
    change: '更改',
    typeface: '风格',
    fontSize: '字号',
    lineHeight: '行高',
    weight: '字重'
  }
}

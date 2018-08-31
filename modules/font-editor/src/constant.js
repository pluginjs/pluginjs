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
  HOVER: '{namespace}-fill-hover',
  EXSIT: '{namespace}-exsit',
  WRITE: '{namespace}-write',
  EXPAND: '{namespace}-expand',
  EXPANDPANEL: '{namespace}-expand-panel',
  EXPANDCONTROL: '{namespace}-expand-control',
  EXPANDCANCEL: '{namespace}-expand-cancel',
  EXPANDSAVE: '{namespace}-expand-save',
  INHERIT: '{namespace}-inherit',
  FILLCHANGE: '{namespace}-fill-change',
  FILLEDIT: '{namespace}-fill-edit',
  FILLREMOVE: '{namespace}-fill-remove',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  FILLFONT: '{namespace}-fill-font',
  FILLFONTNAME: '{namespace}-fill-font-name',
  FILLFONTSUB: '{namespace}-fill-font-sub',
  // fontfamily
  FONTFAMILY: '{namespace}-fontFamily',
  FONTFAMILYTITLE: '{namespace}-fontFamily-title',
  FONTFAMILYCONTENT: '{namespace}-fontFamily-content',
  FONTFAMILYNAMESPACE: '{fontFamilyNamespace}',
  FONTFAMILYDROPDOWN: '{namespace}-fontFamily-dropdown',
  // fontweight
  FONTWEIGHT: '{namespace}-fontWeight',
  FONTWEIGHTTITLE: '"{namespace}-fontWeight-title',
  FONTWEIGHTCONTENT: '{namespace}-fontWeight-content',
  FONTWEIGHTNAMESPACE: '{fontWeightNamespace}',
  FONTWEIGHTDROPDOWN: '{namespace}-fontWeight-dropdown',
  // fontsize
  FONTSIZE: '{namespace}-fontSize',
  FONTSIZETITLE: '{namespace}-fontSize-title',
  FONTSIZECONTENT: '{namespace}-fontSize-content',
  FONTSIZENAMESPACE: '{fontSizeNamespace}',
  FONTSIZERANGE: '{namespace}-fontSize-range',
  // lineHeight
  LINEHEIGHT: '{namespace}-lineHeight',
  LINEHEIGHTTITLE: '{namespace}-lineHeight-title',
  LINEHEIGHTCONTENT: '{namespace}-lineHeight-content',
  LINEHEIGHTNAMESPACE: '{lineHeightNamespace}',
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
  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger'
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
        '<div class="{classes.FONTFAMILY}">' +
        '<span class="{classes.FONTFAMILYTITLE}">{typeface}</span>' +
        '<div class="{classes.FONTFAMILYCONTENT}">' +
        '<div class="{classes.FONTFAMILYNAMESPACE} {classes.FONTFAMILYDROPDOWN}"><span class="pj-dropdown-trigger"></span><i class="asIcon-caret-down"></i></div>' +
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
        '<div class="{classes.FONTWEIGHT}">' +
        '<span class="{classes.FONTWEIGHTTITLE}">{weight}</span>' +
        '<div class="{classes.FONTWEIGHTCONTENT}">' +
        '<div class="{classes.FONTWEIGHTNAMESPACE} {classes.FONTWEIGHTDROPDOWN}"><span class="pj-dropdown-trigger"></span><i class="asIcon-caret-down"></i></div>' +
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
        '<div class="{classes.FONTSIZE}">' +
        '<span class="{classes.FONTSIZETITLE}">{fontSize}</span>' +
        '<div class="{classes.FONTSIZECONTENT}">' +
        '<div class="{classes.FONTSIZENAMESPACE} {classes.FONTSIZERANGE}"></div>' +
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
        '<div class="{classes.LINEHEIGHT}">' +
        '<span class="{classes.LINEHEIGHTTITLE}">{lineHeight}</span>' +
        '<div class="{classes. LINEHEIGHTCONTENT}">' +
        '<div class="{classes.LINEHEIGHTNAMESPACE} {classes.LINEHEIGHTRANGE}"></div>' +
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
      return '<li class="{FONTSTYLE}-fontStyle pj-icon pj-icon-imitation-italics"></li>'
    }
  },
  textTransform: {
    value: 'none',
    values: ['uppercase', 'lowercase', 'capitalize'],
    template() {
      return (
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-all-caps"></li>' +
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-all-lowercase"></li>' +
        '<li class="{classes.TEXTTRANSFORM} pj-icon pj-icon-small-caps"></li>'
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
      '<div class="{classes.FILLFONT}"><span class="{classes.FILLFONTNAME}">{fontFamily}</span><span class="{classes.FILLFONTSUB}"></span></div>' +
      '<div class="{classes.FILLCHANGE}"><i class="{classes.FILLEDIT} pj-icon pj-icon-edit"></i><i class="{classes.FILLREMOVE} pj-icon pj-icon-delete"></i></div>' +
      '</div>' +
      '</div>' +
      '<div class="{classes.DROPDOWN}">' +
      '<div class="{classes.EXPANDPANEL}">' +
      '<div class="{classes.EXPANDCONTROL}"><button type="button" class="{classes.EXPANDCANCEL} pj-btn pj-btn-transparent">Cancel</button><button type="button" class="{classes.EXPANDSAVE} pj-btn pj-btn-primary">Save</button></div>' +
      '</div>' +
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

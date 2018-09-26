export const namespace = 'gradientPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  WRAP: '{namespace}-wrap',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show',
  CLOSE: '{namespace}-close',
  WARNING: '{namespace}-warning',
  EDITOR: '{namespace}-editor',
  REMOVE: '{namespace}-remove',
  HOVER: '{namespace}-hover',
  OPENDISABLE: '{namespace}-open-disabled',
  // panel
  PREVIEWIMG: '{namespace}-preview-img',
  COLORPICKER: '{namespace}-colorpicker',
  COLORTYPE: '{namespace}-colortype',
  PRESET: '{namespace}-preset',
  CUSTOM: '{namespace}-custom',
  CUSTOMMODE: '{namespace}-custom-mode',
  OPACITY: '{namespace}-opacity',
  // select panel
  SELECTORLIST: '{namespace}-selector-list',
  SELECTORITEM: '{namespace}-selector-item',
  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  INPUT: '{namespace}-input',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  FILLIMG: '{namespace}-fill-img',
  TRIGGERACTION: '{namespace}-trigger-action',
  PREVIEW: '{namespace}-preview',
  FIELD: '{namespace}-field',
  FIELDTITLE: '{namespace}-field-title',
  FIELDCONTENT: '{namespace}-field-content',
  BTNACTION: '{namespace}-btn-action',
  CANCEL: '{namespace}-cancel',
  SAVE: '{namespace}-save'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'set',
  'get',
  'val',
  'clear'
]

export const defaults = {
  theme: null,
  locale: 'en',
  data: null, // [json]images data
  disabled: false,
  templates: {
    dropdown() {
      return `<div class='{classes.DROPDOWN}'>
      </div>`
    },
    trigger() {
      return `<div class="{classes.TRIGGER}">
      </div>`
    },
    input() {
      return `<div class='{classes.INPUT}'>
      </div>`
    },
    fill() {
      return `<div class='{classes.FILL }'><div class='{classes.FILLIMG}'></div>
      </div>`
    },
    empty() {
      return `<div class='{classes.EMPTY}'><i class='{icon}'></i>{text}
      </div>`
    },
    colorType() {
      return `<div class='{class}'>
        <div class='{preset}' data-type='preset'>{PresetTitle}</div>
        <div class='{custom}' data-type='custom'>{CustomTitle}</div>
      </div>`
    },
    triggerAction() {
      return `<div class='{classes.TRIGGERACTION}'><i class='pj-icon pj-icon-edit {classes.EDITOR
      }'></i><i class='pj-icon pj-icon-trash {classes.REMOVE}'></i></div>`
    },
    item() {
      return `<li class='{class}'>
      </li>`
    }
  },
  parse(val) {
    if (val) {
      try {
        return JSON.parse(val.replace(/\'/g, '"'))/* eslint-disable-line */

      } catch (e) {
        return null
      }
    }
    return null
  },
  process(val) {
    return JSON.stringify(val)
  }
}

export const dependencies = [
  'scrollable',
  'pop-dialog',
  'edit-panel',
  'gradient',
  'color-picker',
  'range'
]

export const translations = {
  en: {
    chooseGradient: 'Choose Gradient',
    customColor: 'Custom Color',
    opacity: 'Opacity',
    preset: 'Preset',
    custom: 'Custom',
    // cancel: 'Cancel',
    save: 'Save',
    selectTitle: 'Preset Background Library',
    selectContentTitle: 'Choose a Background Preset',
    selectCancel: 'Cancel',
    useIt: 'Use It',
    deleteTitle: 'Are you sure you want to delete?',
    cancel: 'Cancel',
    delete: 'Delete'
  },
  zh: {
    chooseGradient: '选择渐变',
    customColor: '自定义颜色',
    opacity: '透明度',
    preset: '预设',
    custom: '自定义',
    // cancel: '取消',
    save: '保存',
    selectTitle: '预设背景库',
    selectContentTitle: '选择预设背景',
    selectCancel: '取消',
    useIt: '使用',
    deleteTitle: '你确定要删除？',
    cancel: '取消',
    delete: '删除'
  }
}

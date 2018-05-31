export const namespace = 'gradientPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
  // CHANGE: 'change'
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
  // init
  INFO: '{namespace}-info',
  INFOIMG: '{namespace}-info-img',
  // info
  EDITOR: '{namespace}-editor',
  REMOVE: '{namespace}-remove',
  HOVER: '{namespace}-hover',
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
  SELECTORITEM: '{namespace}-selector-item'
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
    colorType() {
      return `<div class='{class}'>
        <div class='{preset}' data-type='preset'>{PresetTitle}</div>
        <div class='{custom}' data-type='custom'>{CustomTitle}</div>
      </div>`
    },
    item() {
      return `<li class='{class}'></li>`
    }
  },
  parse(val) {
    if (val) {
      try {
        return JSON.parse(val.replace(/\'/g, '"'))
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

export const info = { version: '0.1.0' }

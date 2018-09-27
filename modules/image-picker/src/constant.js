import { isString } from '@pluginjs/is'

export const namespace = 'imagePicker'

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
  WRITE: '{namespace}-write',
  EXIST: '{namespace}-exist',
  HOVER: '{namespace}-hover',
  DISABLED: '{namespace}-disabled',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  TRIGGERACTION: '{namespace}-trigger-action',
  FILLIMAGE: '{namespace}-fill-image',
  REMOVE: '{namespace}-remove',
  RESELECT: '{namespace}-reselect',
  INPUT: '{namespace}-input',
  FADEIN: '{namespace}--fadeIn',
  FADEOUT: '{namespace}--fadeOut'
}

export const methods = [
  'get',
  'set',
  'clear',
  'val',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  disabled: false,
  locale: 'en',
  localeFallbacks: true,
  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '<div class="{classes.EMPTY}">' +
      '<i class="pj-icon pj-icon-image"></i>{placeholder}' +
      '</div>' +
      '<div class="{classes.FILL}">' +
      '<img class="{classes.FILLIMAGE}" src="">' +
      '</div>' +
      '<div class="{classes.TRIGGERACTION}">' +
      '<i class="{classes.RESELECT} pj-icon pj-icon-repeat"></i>' +
      '<i class="{classes.REMOVE} pj-icon pj-icon-trash"></i>' +
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
    if (value && isString(value)) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return null
      }
    }
    return null
  },
  onChange() {}, // eslint-disable-line no-empty-function
  select() {
    return false
  },
  strings: {}
}

export const dependencies = ['pop-dialog']

export const translations = {
  en: {
    placeholder: 'Click to upload',
    deleteTitle: 'Are you sure you want to delete?',
    cancel: 'Cancel',
    delete: 'Delete',
    change: 'change'
  },
  zh: {
    placeholder: '点击上传',
    deleteTitle: '你确定要删除？',
    cancel: '取消',
    delete: '删除',
    change: '更换图片'
  }
}

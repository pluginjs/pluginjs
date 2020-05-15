import { isString } from '@pluginjs/is'
export const namespace = 'audioPicker'

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
  WRITE: '{namespace}-write',
  EXIST: '{namespace}-exist',
  HOVER: '{namespace}-hover',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  TRIGGERACTION: '{namespace}-trigger-action',
  FILLTEXT: '{namespace}-fill-text',
  WITHIMAGE: '{namespace}-with-image',
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
  locale: 'en',
  localeFallbacks: true,
  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '<div class="{classes.EMPTY}">' +
      '<i class="pj-icon pj-icon-music-note"></i>{placeholder}' +
      '</div>' +
      '<div class="{classes.FILL}">' +
      '<div class="{classes.FILLTEXT}" />' +
      '</div>' +
      '<div class="{classes.TRIGGERACTION}">' +
      '<i class="{classes.RESELECT} pj-icon pj-icon-upload"></i>' +
      '<i class="{classes.REMOVE} pj-icon pj-icon-trash"></i>' +
      '</div>' +
      '</div>'
    )
  },
  process(value) {
    if (
      value &&
      typeof value.image !== 'undefined' &&
      typeof value !== 'undefined'
    ) {
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
    placeholder: 'Add Audio',
    deleteTitle: 'Are you sure you want to delete?',
    cancel: 'Cancel',
    delete: 'Delete',
    change: 'change'
  },
  zh: {
    placeholder: '添加音频',
    deleteTitle: '你确定要删除？',
    cancel: '取消',
    delete: '删除',
    change: '更换音频'
  }
}

import is from '@pluginjs/is'

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
  EMPTY: '{namespace}-empty',
  EXIST: '{namespace}-exist',
  HOVER: '{namespace}-hover',
  DISABLED: '{namespace}-disabled',
  INITIAL: '{namespace}-initial',
  INFO: '{namespace}-info',
  INFOCHANGE: '{namespace}-info-change',
  INFOIMAGE: '{namespace}-info-image',
  INFOREMOVE: '{namespace}-info-remove',
  INFORESELECT: '{namespace}-info-reselect'
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
      '<div class="{namespace}">' +
      '<div class="{namespace}-initial">' +
      '<i class="icon-picture"></i>{placeholder}' +
      '</div>' +
      '<div class="{namespace}-info">' +
      '<img class="{namespace}-info-image" src="">' +
      '<div class="{namespace}-info-change">' +
      '<i class="{namespace}-info-reselect icon-repeat"></i>' +
      '<i class="{namespace}-info-remove icon-trash"></i>' +
      '</div>' +
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
    if (value && is.string(value)) {
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

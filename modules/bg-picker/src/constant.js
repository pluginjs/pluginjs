import is from '@pluginjs/is'
/* eslint no-empty-function: "off" */
export const namespace = 'bgPicker'

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

  // components
  INPUT: '{namespace}-input',
  INITIATE: '{namespace}-initiate',
  INFO: '{namespace}-info',
  INFOIMAGE: '{namespace}-info-image',
  IMAGENAMEINFO: '{namespace}-info-image-name',
  REMOVE: '{namespace}-info-remove',
  EDIT: '{namespace}-info-edit',
  EXPANDPANEL: '{namespace}-expand-panel',
  CONTROL: '{namespace}-expand-control',
  CANCEL: '{namespace}-expand-cancel',
  SAVE: '{namespace}-expand-save',
  IMAGEWRAP: '{namespace}-expand-image-wrap',
  IMAGE: '{namespace}-expand-image',

  // status
  DISABLED: '{namespace}-disabled',
  ACTIVE: '{namespace}-active',
  HOVER: '{namespace}-hover',
  EMPTY: '{namespace}-empty',
  EXIST: '{namespace}-exist',
  EXPAND: '{namespace}-expand'
}

export const methods = [
  'val',
  'get',
  'set',
  'setAttachment',
  'setPosition',
  'setSize',
  'setRepeat',
  'setImage',
  'clear',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  image: '',
  thumbnail: '',
  locale: 'en',
  localeFallbacks: true,
  disabled: false,
  repeat: {
    defaultValue: 'repeat',
    values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
    template() {
      return (
        '<div class="{namespace}-repeat">' +
        '<span class="{namespace}-repeat-title">{bgRepeat}</span>' +
        '<ul class="{namespace}-repeat-content">' +
        '<li class="{namespace}-repeat-content-item icon-ellipsis-square"></li>' +
        '<li class="{namespace}-repeat-content-item icon-th"></li>' +
        '<li class="{namespace}-repeat-content-item icon-ellipsis-h"></li>' +
        '<li class="{namespace}-repeat-content-item icon-ellipsis-v"></li>' +
        '</ul>' +
        '</div>'
      )
    }
  },

  position: {
    defaultValue: 'top left',
    values: [
      'top left',
      'top center',
      'top right',
      'center left',
      'center center',
      'center right',
      'bottom left',
      'bottom center',
      'bottom right'
    ],
    template() {
      return (
        '<div class="{namespace}-position">' +
        '<span class="{namespace}-position-title">{bgPosition}</span>' +
        '<ul class="{namespace}-position-content">' +
        '<li class="{namespace}-position-content-item icon-arrow-left-up"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-up"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-right-up"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-left"></li>' +
        '<li class="{namespace}-position-content-item icon-center-center"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-right"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-left-down"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-down"></li>' +
        '<li class="{namespace}-position-content-item icon-arrow-right-down"></li>' +
        '</ul>' +
        '</div>'
      )
    }
  },

  size: {
    defaultValue: 'auto',
    values: ['auto 100%', '100% auto', '100% 100%', 'auto'],
    template() {
      return (
        '<div class="{namespace}-size">' +
        '<span class="{namespace}-size-title">{bgSize}</span>' +
        '<ul class="{namespace}-size-content">' +
        '<li class="{namespace}-size-content-item icon-full-height"></li>' +
        '<li class="{namespace}-size-content-item icon-full-width"></li>' +
        '<li class="{namespace}-size-content-item icon-full-screen"></li>' +
        '<li class="{namespace}-size-content-item icon-auto-fit"></li>' +
        '</ul>' +
        '</div>'
      )
    }
  },

  attachment: {
    namespace: 'pj-dropdown',
    defaultValue: 'scroll',
    values: ['scroll', 'fixed', 'inherit'],
    template() {
      return (
        '<div class="{namespace}-attachment">' +
        '<span class="{namespace}-attachment-title">{bgAttach}</span>' +
        '<div class="{namespace}-attachment-content">' +
        '<div class="{attachNamespace} {namespace}-dropdown-trigger"><i class="asIcon-caret-down"></i></div>' +
        '</div>' +
        '</div>'
      )
    }
  },

  template() {
    return (
      '<div class="{namespace}">' +
      '<div class="{namespace}-initiate">' +
      '<i class="icon-picture"></i>{placeholder}' +
      '</div>' +
      '<div class="{namespace}-info">' +
      '<div class="{namespace}-info-image">' +
      '<div class="{namespace}-info-image-name">{placeholder}</div>' +
      '</div>' +
      '<div class="{namespace}-info-change"><i class="{namespace}-info-edit icon-pencil-square"></i><i class="{namespace}-info-remove icon-trash"></i></div>' +
      '</div>' +
      '<div class="{namespace}-expand-panel">' +
      '<div class="{namespace}-expand-image-wrap">' +
      '<div class="{namespace}-expand-image"></div>' +
      '</div>' +
      '<div class="{namespace}-expand-control" href="#"><button type="button" class="{namespace}-expand-cancel pj-btn pj-btn-transparent">{cancel}</button><button type="button" class="{namespace}-expand-save pj-btn pj-btn-primary">{save}</button></div>' +
      '</div>' +
      '</div>'
    )
  },

  process(value) {
    if (value && !is.undefined(value.image) && value.image !== '') {
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
  select() {},
  onChange() {}
}

export const translations = {
  en: {
    placeholder: 'Add Image',
    change: 'change',
    bgRepeat: 'Repeat',
    bgPosition: 'Position',
    bgAttach: 'Attach',
    bgSize: 'Scalling',
    cancel: 'cancel',
    save: 'save'
  },
  zh: {
    placeholder: '添加图片',
    change: '更换图片',
    bgRepeat: '重复',
    bgPosition: '位置',
    bgAttach: '附着',
    bgSize: '比例',
    cancel: '取消',
    save: '保存'
  }
}

export const dependencies = ['dropdown', 'pop-dialog', 'popover', 'tooltip']

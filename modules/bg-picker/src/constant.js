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
  EXPAND: '{namespace}-expand',
  // repeat
  REPEAT: '{namespace}-repeat',
  REPEATTITLE: '{namespace}-repeat-title',
  REPEATCONTENT: '{namespace}-repeat-content',
  REPEATCONTENTITEM: '{namespace}-repeat-content-item',
  // position
  POSITION: '{namespace}-position',
  POSITIONTITLE: '{namespace}-position-title',
  POSITIONCONTENT: '{namespace}-position-content',
  POSITIONCONTENTITEM: '{namespace}-position-content-item',
  // size
  SIZE: '{namespace}-size',
  SIZETITLE: '{namespace}-size-title',
  SIZECONTENT: '{namespace}-size-content',
  SIZECONTENTITEM: '{namespace}-size-content-item',
  // attachment
  ATTACHMENT: '{namespace}-attachment',
  ATTACHMENTTITLE: '{namespace}-attachment-title',
  ATTACHMENTCONTENT: '{namespace}-attachment-content',
  DROPDOWNTRIGGER: '{namespace}-dropdown-trigger',
  ATTACH: '{attachNamespace}'
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
        '<div class="{classes.REPEAT}">' +
        '<span class="{classes.REPEATTITLE}</span>' +
        '<ul class="{classes.REPEATCONTENT}">' +
        '<li class="{classes.REPEATCONTENTITEM} icon-ellipsis-square"></li>' +
        '<li class="{classes.REPEATCONTENTITEM} icon-th"></li>' +
        '<li class="{classes.REPEATCONTENTITEM} icon-ellipsis-h"></li>' +
        '<li class="{classes.REPEATCONTENTITEM} icon-ellipsis-v"></li>' +
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
        '<div class="{classes.POSITION}">' +
        '<span class="{classes.POSITIONTITLE}">{bgPosition}</span>' +
        '<ul class="{classes.POSITIONCONTENT}">' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-left-up"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-up"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-right-up"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-left"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-center-center"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-right"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-left-down"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-down"></li>' +
        '<li class="{classes.POSITIONCONTENTITEM} icon-arrow-right-down"></li>' +
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
        '<div class="{classes.SIZE}">' +
        '<span class="{classes.SIZETITLE}">{bgSize}</span>' +
        '<ul class="{classes.SIZECONTENT}">' +
        '<li class="{classes.SIZECONTENTITEM} icon-full-height"></li>' +
        '<li class="{classes.SIZECONTENTITEM} icon-full-width"></li>' +
        '<li class="{classes.SIZECONTENTITEM} icon-full-screen"></li>' +
        '<li class="{classes.SIZECONTENTITEM} icon-auto-fit"></li>' +
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
        '<div class="{classes.ATTACHMENT}">' +
        '<span class="{classes.ATTACHMENTTITLE}">{bgAttach}</span>' +
        '<div class="{classes.ATTACHMENTCONTENT}">' +
        '<div class="{attachNamespace} {classes.DROPDOWNTRIGGER}"><i class="asIcon-caret-down"></i></div>' +
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

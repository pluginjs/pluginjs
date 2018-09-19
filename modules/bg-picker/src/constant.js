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
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  FILLIMAGE: '{namespace}-fill-image',
  IMAGENAMEFILL: '{namespace}-fill-image-name',
  REMOVE: '{namespace}-fill-remove',
  EDIT: '{namespace}-fill-edit',
  CHANGE: '{namespace}-fill-change',
  EXPANDPANEL: '{namespace}-expand-panel',
  CONTROL: '{namespace}-expand-control',
  CANCEL: '{namespace}-expand-cancel',
  SAVE: '{namespace}-expand-save',
  IMAGEWRAP: '{namespace}-expand-image-wrap',
  IMAGE: '{namespace}-expand-image',
  // field
  FIELD: '{namespace}-field {namespace}-{field}',
  FIELDTITLE: '{namespace}-field-title',
  FIELDCONTENT: '{namespace}-field-content',
  FIELDCONTENTITEM: '{namespace}-field-content-item',
  // status
  DISABLED: '{namespace}-disabled',
  ACTIVE: '{namespace}-active',
  HOVER: '{namespace}-hover',
  WRITE: '{namespace}-write',
  EXIST: '{namespace}-exist',
  SHOW: '{namespace}-show',
  OPENDISABLE: '{namespace}-open-disabled',
  // repeat
  REPEAT: '{namespace}-repeat',
  REPEATTITLE: '{namespace}-repeat-title',
  REPEATCONTENT: '{namespace}-repeat-content',
  REPEATCONTENTITEM: '{namespace}-repeat-content-item',
  // position
  POSITION: '{namespace}-position',
  POSITIONTITLE: '{namespace}-position-title',
  POSITIONCONTENT: '{namespace}-position-content',
  // size
  SIZE: '{namespace}-size',
  SIZETITLE: '{namespace}-size-title',
  SIZECONTENT: '{namespace}-size-content',
  SIZETRIGGER: '{namespace}-size-trigger',
  SIZEPANEL: '{namespace}-size-panel',
  // attachment
  ATTACHMENT: '{namespace}-attachment',
  ATTACHMENTTITLE: '{namespace}-attachment-title',
  ATTACHMENTCONTENT: '{namespace}-attachment-content',
  DROPDOWNTRIGGER: '{namespace}-dropdown-trigger',
  ATTACH: '{attachNamespace}',
  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger'
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
  value: {
    repeat: 'repeat-x',
    position: 'center center',
    attachment: 'inherit',
    size: 'auto',
    image: 'https://picsum.photos/200/300?image=1068',
    thumbnail: 'http://via.placeholder.com/350x150'
  },
  repeat: {
    defaultValue: 'repeat',
    values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{bgRepeat}</span>' +
        '<ul class="{classes.FIELDCONTENT}">' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-no-repeat"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-repeat"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-repeat-horizontal"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-repeat-vertical"></li>' +
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
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{bgPosition}</span>' +
        '<ul class="{classes.FIELDCONTENT}">' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-top-left"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-top-center"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-top-right"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-center-left"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-center"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-center-right"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-bottom-left"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-bottom-center"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-bottom-right"></li>' +
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
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{bgSize}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<span class={classes.SIZETRIGGER}></span>' +
        '</div>' +
        '</div>'
      )
    }
  },

  attachment: {
    defaultValue: 'scroll',
    values: ['scroll', 'fixed', 'inherit'],
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{bgAttach}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<div class="{classes.DROPDOWNTRIGGER}"></div>' +
        '</div>' +
        '</div>'
      )
    }
  },

  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '<div class="{classes.TRIGGER}">' +
      '<div class="{classes.EMPTY}">' +
      '<i class="pj-icon pj-icon-image"></i>{placeholder}' +
      '</div>' +
      '<div class="{classes.FILL}">' +
      '<div class="{classes.FILLIMAGE}">' +
      '<div class="{classes.IMAGENAMEFILL}">{placeholder}</div>' +
      '</div>' +
      '<div class="{classes.CHANGE}"><i class="{classes.EDIT} pj-icon pj-icon-edit"></i><i class="{classes.REMOVE} pj-icon pj-icon-delete"></i></div>' +
      '</div>' +
      '</div>' +
      '<div class="{classes.DROPDOWN}">' +
      '<div class="{classes.IMAGEWRAP}">' +
      '<div class="{classes.IMAGE}"></div>' +
      '</div>' +
      '<div class="{classes.CONTROL}" href="#"><button type="button" class="{classes.CANCEL} pj-btn pj-btn-transparent">{cancel}</button><button type="button" class="{classes.SAVE} pj-btn pj-btn-primary">{save}</button></div>' +
      '</div>' +
      '</div>'
    )
  },

  process(value) {
    if (value && typeof value.image !== 'undefined' && value.image !== '') {
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

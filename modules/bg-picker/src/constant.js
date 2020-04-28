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
  TIGGERACTION: '{namespace}-trigger-action',
  REMOVE: '{namespace}-remove',
  EDIT: '{namespace}-edit',
  CONTROL: '{namespace}-control',
  CANCEL: '{namespace}-cancel',
  SAVE: '{namespace}-save',
  PREVIEW: '{namespace}-preview',
  IMAGE: '{namespace}-image',
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
  SIZEPANEL: '{namespace}-size-panel',
  // attachment
  ATTACHMENT: '{namespace}-attachment',
  ATTACHMENTTITLE: '{namespace}-attachment-title',
  ATTACHMENTCONTENT: '{namespace}-attachment-content',
  ATTACH: '{attachNamespace}',
  DROPDOWN: '{namespace}-dropdown',
  SELECTTRIGGER: '{namespace}-select-trigger',
  TRIGGER: '{namespace}-trigger',
  // image
  SELECTEDDISABLE: '{namespace}-selected-disabled',
  IMAGECHANGEDDISABLE: '{namespace}-image-changed-disabled',
  IMAGESELECTED: '{namespace}-image-selected',
  IMAGESELECT: '{namespace}-image-select',
  IMAGECHANGE: '{namespace}-image-change',
  IMAGENAME: '{namespace}-image-name',
  IMAGEENTERCHANGE: '{namespace}-image-enter-change',
  IMAGEREMOVE: '{namespace}-image-remove'
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
  locale: 'en',
  responsiveDropdownFull: false,
  localeFallbacks: true,
  hideOutClick: true,
  disabled: false,
  dropdown: {
    placement: 'bottom-start'
  },
  repeat: {
    defaultValue: 'repeat',
    values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{bgRepeat}</span>' +
        '<ul class="{classes.FIELDCONTENT}">' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-no-repeat" title="{noRepeat}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-repeat" title="{repeat}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-repeat-horizontal" title="{repeatX}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-repeat-vertical" title="{repeatY}"></li>' +
        '</ul>' +
        '</div>'
      )
    }
  },

  selectImage: {
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{image}</span>' +
        '<div class="{classes.FIELDCONTENT} pj-input">' +
        '<span class="{classes.IMAGESELECT}">{selectImage}</span>' +
        '<span class="{classes.IMAGECHANGE}">{changeImage}</span>' +
        '<span class="{classes.IMAGENAME}"></span>' +
        '<span class="{classes.IMAGEREMOVE} pj-icon pj-icon-close"></span>' +
        '</div>' +
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
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-top-left" title="{topLeft}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-top-center" title="{topCenter}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-top-right" title="{topRight}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-center-left" title="{centerLeft}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-center" title="{center}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-center-right" title="{centerRight}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-bottom-left" title="{bottomLeft}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-bottom-center" title="{bottomCenter}"></li>' +
        '<li class="{classes.FIELDCONTENTITEM} pj-icon pj-icon-bottom-right" title="{bottomRight}"></li>' +
        '</ul>' +
        '</div>'
      )
    }
  },

  size: {
    defaultValue: 'auto',
    values: ['auto', 'auto 100%', '100% auto', '100% 100%', 'contain', 'cover'],
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{bgSize}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.SELECTTRIGGER} pj-input" />' +
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
        '<input class="{classes.SELECTTRIGGER} pj-input"></div>' +
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
      '</div>' +
      '</div>' +
      '<div class="{classes.TIGGERACTION}"><i class="{classes.EDIT} pj-icon pj-icon-edit"></i><i class="{classes.REMOVE} pj-icon pj-icon-trash"></i></div>' +
      '</div>' +
      '<div class="{classes.DROPDOWN}">' +
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
    selectImage: 'Select Image',
    changeImage: 'Change Image',
    noRepeat: 'no repeat',
    repeat: 'repeat',
    repeatX: 'repeat-x',
    repeatY: 'repeat-y',
    topLeft: 'top-left',
    topCenter: 'top-center',
    topRight: 'top-right',
    centerLeft: 'center-left',
    centerRight: 'center-right',
    center: 'center',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
    bottomCenter: 'bottom-center',
    placeholder: 'Add Image',
    change: 'change',
    bgRepeat: 'Repeat',
    image: 'Image',
    bgPosition: 'Position',
    bgAttach: 'Attach',
    bgSize: 'Scalling',
    cancel: 'cancel',
    save: 'save'
  },
  zh: {
    selectImage: '选择图片',
    changeImage: '改变图片',
    noRepeat: '不重复',
    repeat: '重复',
    repeatX: 'x轴重复',
    repeatY: 'y轴重复',
    topLeft: '上左',
    topCenter: '上',
    topRight: '上右',
    centerLeft: '左',
    centerRight: '右',
    center: '中央',
    bottomLeft: '下左',
    bottomRight: '下右',
    bottomCenter: '下',
    placeholder: '添加图片',
    change: '更换图片',
    bgRepeat: '重复',
    image: '图片',
    bgPosition: '位置',
    bgAttach: '附着',
    bgSize: '比例',
    cancel: '取消',
    save: '保存'
  }
}

export const dependencies = ['dropdown', 'pop-dialog', 'popover', 'tooltip']

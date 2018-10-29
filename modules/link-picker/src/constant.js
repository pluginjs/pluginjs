export const namespace = 'linkPicker'

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
  CONTAINER: '{namespace}-container',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  EMPTY: '{namespace}-empty',
  INPUT: '{namespace}-input',
  FILL: '{namespace}-fill',
  TYPESWITCH: '{namespace}-types-switch',
  TYPESPANEL: '{namespace}-types-panel',
  TYPESCONTAINER: '{namespace}-types-container',
  TYPESCOMPONENT: '{namespace}-types-component',
  RADIO: '{namespace}-radio',
  RADIOINPUT: '{namespace}-radio-input',
  LINK: '{namespace}-link',
  ACTION: '{namespace}-action',
  ACTIONEDIT: '{namespace}-action-edit',
  ACTIONREMOVE: '{namespace}-action-remove',
  DROPDOWN: '{namespace}-dropdown',
  DROPDOWNACTION: '{namespace}-dropdown-action',
  DROPDOWNSAVE: '{namespace}-dropdown-save',
  DROPDOWNCANCEL: '{namespace}-dropdown-cancel',
  ITEM: '{namespace}-item',
  ITEMTITLE: '{namespace}-item-title',
  ITEMBODY: '{namespace}-item-body',
  TITLE: '{namespace}-title',
  DROPDOWNPANEL: '{namespace}-dropdown-panel',
  SHOW: '{namespace}-show',
  WRITE: '{namespace}-write',
  HOVER: '{namespace}-fill-hover',
  TRIGGER: '{namespace}-trigger',
  // field
  FIELD: '{namespace}-field {namespace}-{field}',
  FIELDTITLE: '{namespace}-field-title',
  FIELDCONTENT: '{namespace}-field-content',
  // dropdown
  // DROPDOWN: '{namespace}-dropdown',
  // TRIGGER: '{namespace}-trigger',
  OPENDISABLE: '{namespace}-open-disabled',
  SELECTTRIGGER: '{namespace}-select-trigger',
  CASCADERTRIGGER: '{namespace}-cascader-trigger',
  TYPESHOW: '{namespace}-type-show'
}

export const methods = ['val', 'set', 'enable', 'disable', 'destroy', 'get']

export const defaults = {
  placeholder: 'Click to Add Link',
  locale: 'en',
  disabled: false,
  type: {
    value: 'internal',
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{type}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.SELECTTRIGGER}" />' +
        '</div>' +
        '</div>'
      )
    }
  },
  target: {
    value: '_self',
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{openMode}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.SELECTTRIGGER}" />' +
        '</div>' +
        '</div>'
      )
    }
  },
  title: {
    value: '',
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{title}</span>' +
        '<input type="text" class="pj-input"  />' +
        '</div>'
      )
    }
  },
  internal: {
    value: '',
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{internal}</span>' +
        '<div class="{classes.FIELDCONTENT}">' +
        '<input type="text" class="{classes.CASCADERTRIGGER}" />' +
        '</div>' +
        '</div>'
      )
    }
  },
  external: {
    value: '',
    template() {
      return (
        '<div class="{field}">' +
        '<span class="{classes.FIELDTITLE}">{external}</span>' +
        '<input type="text" class="pj-input"  />' +
        '</div>'
      )
    }
  },
  //  data: null,
  sources: null, // [Array] list of source name.
  templates: {
    trigger() {
      return `<div class='{classes.TRIGGER}'>
      </div>`
    },
    empty() {
      return `<div class='{classes.EMPTY}'>
        <i class='pj-icon pj-icon-link-url'></i>
        {placeholder}
      </div>`
    },
    action() {
      return `<div class='{classes.ACTION}'>
          <i class='pj-icon pj-icon-edit {classes.ACTIONEDIT}'></i>
          <i class='pj-icon pj-icon-remove {classes.ACTIONREMOVE}'></i>
        </div>`
    },
    fill() {
      return `<div class='{classes.FILL}'><i class='pj-icon pj-icon-link-url'></i><div class='{classes.LINK}'></div>
      </div>`
    },
    dropdown() {
      return `<div class='{classes.DROPDOWN}'>
      </div>`
    },
    container() {
      return `<div class='{class}' data-type='{type}'>
      </div>`
    },
    item() {
      return `<div class='{class}' data-value='{name}'><div class='{titleClass}'>{placeholder}: </div><div class='{body}' data-connect="{parent}"></div>
      </div>`
    },
    dropdownAction() {
      return `<div class='{classes.DROPDOWNACTION}'><button type='button' class='pj-btn pj-btn-transparent pj-btn-xs {classes.DROPDOWNCANCEL}'>{cancelTitle}</button><button type='button' class='pj-btn pj-btn-primary pj-btn-xs {classes.DROPDOWNSAVE}'>{saveTitle}</button>
      </div>`
    }
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
  }
}

export const dependencies = ['dropdown', 'pop-dialog', 'radio']

export const translations = {
  en: {
    type: 'Type',
    internal: 'Internal',
    external: 'External',
    openMode: 'Open Mode',
    title: 'Link Title',
    save: 'Save',
    cancel: 'Cancel',
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete'
  },
  zh: {
    type: '类型',
    internal: '内部',
    external: '外部',
    openMode: '打开模式',
    title: '链接标题',
    save: '保存',
    cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除'
  }
}

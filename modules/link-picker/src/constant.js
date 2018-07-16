export const namespace = 'linkPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
  // CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  CONTAINER: '{namespace}-container',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  INIT: '{namespace}-init',
  INFO: '{namespace}-info',
  PREVIEW: '{namespace}-preview',
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
  PANEL: '{namespace}-panel',
  PANELACTION: '{namespace}-panel-action',
  PANELSAVE: '{namespace}-panel-save',
  PANELCANCEL: '{namespace}-panel-cancel',
  ITEM: '{namespace}-item',
  ITEMTITLE: '{namespace}-item-title',
  ITEMBODY: '{namespace}-item-body',
  LINKTITLE: '{namespace}-link-title',
  DROPDOWNPANEL: '{namespace}-dropdown-panel',
  SHOW: '{namespace}-show',
  FILL: '{namespace}-fill',
  HOVER: '{namespace}-hover'
}

export const methods = [
  'val',
  'set',
  'enable',
  'disable',
  'destroy',
  'update',
  'get'
]

export const defaults = {
  title: 'Click to Add Link',
  placeholder: 'Title',
  locale: 'en',
  disabled: false,
  //  data: null,
  sources: null, // [Array] list of source name.
  templates: {
    init() {
      return `<div class='{class}'>
        <i class='icon-chain'></i>
        {title}
      </div>`
    },
    action() {
      return `<div class='{class}'>
          <i class='icon-pencil-square {edit}'></i>
          <i class='icon-trash {remove}'></i>
        </div>`
    },
    preview() {
      return `<div class='{class}'><i class='icon-chain'></i><div class='{link}'></div>
      </div>`
    },
    panel() {
      return `<div class='{class}'>
      </div>`
    },
    container() {
      return `<div class='{class}' data-type='{type}'>
      </div>`
    },
    item() {
      return `<div class='{class}' data-value='{name}'><div class='{titleClass}'>{title}: </div><div class='{body} data-connect="{parent}"'></div>
      </div>`
    },
    panelAction() {
      return `<div class='{class}'><button type='button' class='pj-btn pj-btn-transparent pj-btn-xs {cancel}'>{cancelTitle}</button><button type='button' class='pj-btn pj-btn-primary pj-btn-xs {save}'>{saveTitle}</button>
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
    contentType: 'Content Type',
    content: 'Content',
    openMode: 'Open Mode',
    linkTitle: 'Link Title',
    save: 'Save',
    cancel: 'Cancel',
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete',
    typeData: [
      { label: 'site content' },
      { label: 'site archive' },
      { label: 'external url' },
      { label: 'submit form' },
      { label: 'scroll to target' }
    ],
    contentData: [
      { label: 'page' },
      { label: 'post' },
      { label: 'portfolio' },
      { label: 'categogry archive' },
      { label: 'tag archive' }
    ],
    openModeData: [{ label: 'same window' }, { label: 'new window' }]
  },
  zh: {
    type: '类型',
    contentType: '内容样式',
    content: '内容',
    openMode: '打开模式',
    linkTitle: '链接标题',
    save: '保存',
    cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除',
    typeData: [
      { label: '网站内容' },
      { label: '网站存档' },
      { label: '外部网址' },
      { label: '提交表单' },
      { label: '滚动到目标' }
    ],
    contentData: [
      { label: '页面' },
      { label: '推送' },
      { label: '组合' },
      { label: '类别档案' },
      { label: '标签档案' }
    ],
    openModeData: [{ label: '同一窗口' }, { label: '新窗口' }]
  }
}

export const namespace = 'list'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ADD: 'add',
  CLICKITEM: 'clickItem',
  CLEAR: 'clear',
  EDITED: 'edited'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  CONTAINER: '{namespace}-container',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  ITEM: '{namespace}-item',
  LABEL: '{namespace}-item-label',
  ACTIONS: '{namespace}-item-actions',
  HANDLE: '{namespace}-item-handle',
  STORE: '{namespace}-store',
  POPVER: '{namespace}-popver',
  CLONEANIMATE: '{namespace}-item-clone-animate'
}

export const methods = [
  'set',
  'get',
  'val',
  'enable',
  'disable',
  'destroy',
  'init',
  'insert',
  'clear'
]

export const defaults = {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  data: null,
  disabled: false,
  label(item) {
    if (typeof item === 'object' && Object.hasOwnProperty.call(item, 'title')) {
      return item.title
    } else if (typeof item === 'string') {
      return item
    }
    return 'undefined'
  },
  actions: [
    {
      tagName: 'i',
      trigger: 'pj-icon pj-icon-remove pj-list-close',
      event: 'click'
    }
  ],
  templates: {
    container() {
      return `<ul class='{classes.CONTAINER}'>
      </ul>`
    },
    item() {
      return `<li class='{classes.ITEM}'>
      <span class='{classes.HANDLE}'><i class='pj-icon pj-icon-drag-bar'></i></span><div class='{classes.LABEL}'>{label}</div></li>`
    },
    actions() {
      return `<div class='{classes.ACTIONS}'>
      </div>`
    }
  },
  parse(data) {
    if (data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return {}
      }
    }
    return {}
  },
  process(data) {
    if (data && typeof data !== 'undefined') {
      return JSON.stringify(data)
    }
    return ''
  }
}

export const dependencies = ['pop-dialog', 'sortable']

export const translations = {
  en: {
    cancel: 'Cancel',
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete'
  },
  zh: {
    cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除'
  }
}

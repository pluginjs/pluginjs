export const namespace = 'itemList'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ADD: 'add',
  CLICKADDBTN: 'clickAddBtn',
  CLICKITEM: 'clickItem',
  CLONE: 'clone'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ADD: '{namespace}-add',
  CANCEL: '{namespace}-cancel',
  SAVE: '{namespace}-save',
  CLONE: '{namespace}-item-clone',
  DISABLED: '{namespace}-disabled'
}

export const methods = []

export const defaults = {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  data: null,
  actions: [],
  templates: {
    add() {
      return `<div class="{className} icon-plus"></div>`
    }
  }
}

export const dependencies = ['list']

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

export const info = { version: '0.0.1' }

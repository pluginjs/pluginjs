import List from '@pluginjs/list'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'tagList'
export const events = deepMerge(List.events, {})

export const classes = deepMerge(List.classes, {
  NAMESPACE: 'pj-list',
  ADD: '{namespace}-add',
  ADDINPUT: '{namespace}-input',
  ADDBTN: '{namespace}-btn'
})

export const methods = deepMerge(List.methods, [])

export const defaults = deepMerge(List.defaults, {
  templates: {
    add() {
      return `<div class="{classes.ADD}">
  <input type="text" class="pj-input {classes.ADDINPUT}" placeholder={placeholder}>
  <button type="button" class="pj-btn {classes.ADDBTN}">{btnText}</button>
</div>`
    }
  }
})

export const dependencies = ['list']

export const translations = {
  en: {
    addPlaceholder: 'Enter new tags...',
    add: 'Add',
    cancel: 'Cancel',
    deleteAction: 'Are you sure you want to delete?',
    delete: 'Delete'
  },
  zh: {
    addPlaceholder: '添加新标签...',
    add: '添加',
    cancel: '取消',
    deleteAction: '你确定要删除？',
    delete: '删除'
  }
}

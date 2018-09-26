import List from '@pluginjs/list'
import { deepMerge } from '@pluginjs/utils'
import { bindEvent } from '@pluginjs/events'
export const namespace = 'itemList'

export const events = deepMerge(List.events, {
  CLONE: 'clone',
  CLICKADD: 'clickAdd'
})

export const classes = deepMerge(List.classes, {
  NAMESPACE: 'pj-list',
  WRAPPER: '{namespace} pj-item-list',
  ADD: '{namespace}-add',
  CLONE: '{namespace}-item-clone',
  DISABLED: '{namespace}-disabled'
})

export const methods = deepMerge(List.methods, [])

export const defaults = deepMerge(List.defaults, {
  templates: {
    add() {
      return `<button type="button" class="{classes.ADD}" title="{addText}">
  <i class="pj-icon pj-icon-plus"></i>
</button>`
    }
  }
})

defaults.actions.unshift({
  title: 'Clone',
  name: 'clone',
  class: 'pj-icon pj-icon-copy',
  init(instance, item, $item) {
    bindEvent(
      instance.eventName('click'),
      () => {
        const index = instance.getIndex($item)
        instance.clone(index)
      },
      this
    )
  }
})

export const dependencies = ['list']

export const translations = {
  en: {
    add: 'Add',
    cancel: 'Cancel',
    deleteAction: 'Are you sure you want to delete?',
    delete: 'Delete'
  },
  zh: {
    add: '添加',
    cancel: '取消',
    deleteAction: '你确定要删除？',
    delete: '删除'
  }
}

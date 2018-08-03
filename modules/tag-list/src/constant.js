import List from '@pluginjs/list'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'tagList'
export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = deepMerge(List.classes, {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ADD: '{namespace}-add',
  ADDINPUT: '{namespace}-input',
  ADDBTN: '{namespace}-btn'
})

export const methods = ['value', 'enable', 'disable', 'destroy']

export const defaults = deepMerge(List.defaults, {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  data: null,
  actions: [
    {
      tagName: 'i',
      trigger: 'icon-close pj-list-close',
      event: 'click',
      init(instance, $action, contentTitle, cancelTitle, deleteTitle) {
        $action.asPopDialog({
          placement: 'bottom',
          content: contentTitle,
          buttons: {
            cancel: { label: cancelTitle },
            delete: {
              label: deleteTitle,
              color: 'danger',
              fn(resolve) {
                instance.remove(
                  $action.closest(`.${instance.classes.ITEM}`).index()
                )
                resolve()
              }
            }
          },
          template() {
            return (
              '<div class="{classes.POPOVER} {classes.POPDIALOG} pj-list-pop" role="tooltip">' +
              '{close}' +
              '{title}' +
              '{content}' +
              '{buttons}' +
              '</div>'
            )
          }
        })
      }
    }
  ],
  templates: {
    add() {
      return `<div class="pj-tagList-add"><input type="text" class="pj-input pj-tagList-input" placeholder={placeholder}><button type="button" class="pj-tagList-btn">{BtnText}</button>
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
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete'
  },
  zh: {
    addPlaceholder: '添加新标签...',
    add: '添加',
    cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除'
  }
}

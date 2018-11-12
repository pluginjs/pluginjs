import { isString } from '@pluginjs/is'
import PopDialog from '@pluginjs/pop-dialog'

export const namespace = 'list'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  ADD: 'add',
  EDIT: 'edit',
  REMOVE: 'remove',
  CHANGE: 'change',
  CLICKITEM: 'clickItem',
  SORT: 'sort',
  CLEAR: 'clear',
  CHECK: 'check',
  UNCHECK: 'uncheck'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAPPER: '{namespace}',
  THEME: '{namespace}--{theme}',
  CONTAINER: '{namespace}-container',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  ITEM: '{namespace}-item',
  LABEL: '{namespace}-item-label',
  ACTIONS: '{namespace}-item-actions',
  ACTION: '{namespace}-item-action',
  HANDLE: '{namespace}-item-handle',
  ELEMENT: '{namespace}-origin',
  NEW: '{namespace}-new',
  POPOVER: '{namespace}-popover',
  CLONEANIMATE: '{namespace}-item-clone-animate'
}

export const methods = [
  'set',
  'get',
  'val',
  'enable',
  'disable',
  'destroy',
  'add',
  'remove',
  'edit',
  'clear'
]

export const defaults = {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  data: null,
  disabled: false,
  label(item) {
    if (typeof item === 'object' && Object.hasOwnProperty.call(item, 'label')) {
      return item.label
    } else if (typeof item === 'string') {
      return item
    }
    return 'undefined'
  },
  actions: [
    {
      label: 'Delete',
      action: 'delete',
      classes: 'pj-icon pj-icon-trash',
      init(instance, item, $item) {
        PopDialog.of(this, {
          classes: {
            POPOVER: `{namespace} ${instance.classes.POPOVER}`
          },
          placement: 'bottom',
          content: instance.translate('deleteAction'),
          buttons: [
            {
              action: 'cancel',
              label: instance.translate('cancel')
            },
            {
              action: 'delete',
              label: instance.translate('delete'),
              color: 'danger',
              fn(resolve) {
                const index = instance.getIndex($item)
                instance.remove(index)
                resolve()
              }
            }
          ]
        })
      }
    }
  ],
  templates: {
    container() {
      return '<ul class="{classes.CONTAINER}"></ul>'
    },
    item() {
      return `<li class='{classes.ITEM}'>
  <span class='{classes.HANDLE}'><i class='pj-icon pj-icon-list'></i></span>
  <div class='{classes.LABEL}'>{label}</div>
  <div class='{classes.ACTIONS}'>{actions}</div>
</li>`
    },
    action() {
      return '<i class="{classes.ACTION} {action.classes}" data-action="{action.action}" title="{action.label}"></i>'
    }
  },
  parse(data) {
    if (isString(data)) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return []
      }
    }
    return []
  },
  process(data) {
    if (data && typeof data !== 'undefined' && data.length !== 0) {
      return JSON.stringify(data)
    }
    return ''
  }
}

export const dependencies = ['pop-dialog', 'sortable']

export const translations = {
  en: {
    cancel: 'Cancel',
    delete: 'Delete',
    deleteAction: 'Are you sure you want to delete?'
  },
  zh: {
    cancel: '取消',
    deleteAction: '你确定要删除？',
    delete: '删除'
  }
}

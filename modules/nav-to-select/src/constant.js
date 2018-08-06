export const namespace = 'navToSelect'
import { children } from '@pluginjs/dom'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  SELECT: '{namespace}',
  THEME: '{namespace}--{theme}'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'getItemValue',
  'isLinkable',
  'isActived',
  'isBuilded',
  'getSelect'
]

export const defaults = {
  maxLevel: 4,
  prependTo: null,
  activeClass: 'active',
  linkSelector: 'a',
  indentString: '&ndash;',
  indentSpace: true,
  placeholder: 'Navigate to...',
  useOptgroup: true,
  itemFilter() {
    return true
  },
  getItemLabel(li) {
    return li.querySelector(this.options.linkSelector).textContent
  },
  getItemsFromList(list, level) {
    const that = this
    const privateItems = []

    children(list, 'li').forEach(li => {
      if (!that.options.itemFilter(li)) {
        return
      }
      const item = {
        value: that.getItemValue(li),
        label: that.options.getItemLabel.call(that, li),
        linkable: that.isLinkable(li),
        actived: that.isActived(li)
      }
      if (children(li, 'ul').length) {
        item.items = []
        children(li, 'ul').forEach(childLi => {
          item.items = item.items.concat(
            that.options.getItemsFromList.call(that, childLi, level + 1)
          )
        })
      }
      if (children(li, 'ol').length) {
        item.items = []
        children(li, 'ol').forEach(childLi => {
          item.items = item.items.concat(
            that.options.getItemsFromList.call(that, childLi, level + 1)
          )
        })
      }

      privateItems.push(item)
    })
    return privateItems
  },
  onChange() {
    if (this.dataset.linkable !== false) {
      // document.location.href = this.value
    }
  }
}

export const dependencies = []

export const info = { version: '0.5.1' }

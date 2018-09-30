export const namespace = 'navToSelect'
import { children, getData } from '@pluginjs/dom'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ORIGINAL: '{namespace}-original',
  SELECT: '{namespace}',
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}-wrap'
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
  useOptgroup: true, // use under max level 2
  multiple: false,
  itemFilter() {
    return true
  },
  getItemLabel(li) {
    return li.querySelector(this.options.linkSelector).textContent
  },
  getItemsFromList(list, level) {
    const that = this
    const privateItems = []
    children('li', list).forEach(li => {
      if (!that.options.itemFilter(li)) {
        return
      }
      const item = {
        value: that.getItemValue(li),
        label: that.options.getItemLabel.call(that, li),
        linkable: that.isLinkable(li),
        actived: that.isActived(li)
      }
      if (children('ul', li).length) {
        item.items = []
        children('ul', li).forEach(childLi => {
          item.items = item.items.concat(
            that.options.getItemsFromList.call(that, childLi, level + 1)
          )
        })
      }
      if (children('ol', li).length) {
        item.items = []
        children('ol', li).forEach(childLi => {
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
    if (getData('linkable', this) !== false) {
      // document.location.href = this.value
    }
  }
}

export const dependencies = []

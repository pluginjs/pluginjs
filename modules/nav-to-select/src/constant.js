export const namespace = 'navToSelect'

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

    const childrenSelect = (el, selector) =>
      Array.from(el.children).filter(c => c.nodeName.toLowerCase() === selector)

    childrenSelect(list, 'li').forEach(li => {
      if (!that.options.itemFilter(li)) {
        return
      }
      const item = {
        value: that.getItemValue(li),
        label: that.options.getItemLabel.call(that, li),
        linkable: that.isLinkable(li),
        actived: that.isActived(li)
      }
      if (childrenSelect(li, 'ul').length) {
        item.items = []
        childrenSelect(li, 'ul').forEach(childLi => {
          item.items = item.items.concat(
            that.options.getItemsFromList.call(that, childLi, level + 1)
          )
        })
      }
      if (childrenSelect(li, 'ol').length) {
        item.items = []
        childrenSelect(li, 'ol').forEach(childLi => {
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
      // console.log('this', this.autofocus)
      // document.location.href = this.value
    }
  }
}

export const dependencies = []

export const info = { version: '0.5.1' }

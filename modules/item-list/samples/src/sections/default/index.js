import { query } from '@pluginjs/dom'
import ItemList from '@pluginjs/item-list'

const data = [
  {
    label: 'Interfaces',
    value: 'interface'
  },
  {
    label: 'UI Design',
    value: 'ui-design'
  },
  {
    label: 'Web Design',
    value: 'web-design'
  },
  {
    label: 'Typography',
    value: 'typography'
  },
  {
    label: 'Landing',
    value: 'landing'
  }
]

const element = query('#default .example-default')
ItemList.of(element, {
  data,
  onClickAdd() {
    this.add({
      label: 'Test',
      value: 'test'
    })
  },
  onClickItem(i, item) {
    item.label += ' edited'
    this.edit(i, item)
  }
})

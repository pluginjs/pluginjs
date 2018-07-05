import { query } from '@pluginjs/dom'
import ItemList from '@pluginjs/item-list'

const data = [
  {
    title: 'Interfaces',
    value: 'interface'
  },
  {
    title: 'UI Design',
    value: 'ui-design'
  },
  {
    title: 'Web Design',
    value: 'web-design'
  },
  {
    title: 'Typography',
    value: 'typography'
  },
  {
    title: 'Landing',
    value: 'landing'
  }
]

const element = query('#default .example-default')
ItemList.of(element, {
  data,
  onClickAddBtn() {
    this.insert({
      title: 'Test',
      value: 'test'
    })
  },
  onClickItem(item, i) {
    item.title += ' edited'
    this.edit(item, i)
  }
})

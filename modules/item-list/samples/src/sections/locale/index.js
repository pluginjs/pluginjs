import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
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

const element = query('.example-locale', render(html, query('#locale')))
ItemList.of(element, {
  locale: 'zh',
  data,
  onClickAddBtn() {
    this.insert({
      title: 'Test',
      value: 'test'
    })
  }
})

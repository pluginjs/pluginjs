import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TagList from '@pluginjs/tag-list'

const element = query('.example-locale', render(html, query('#locale')))
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

TagList.of(element, { locale: 'zh', data })

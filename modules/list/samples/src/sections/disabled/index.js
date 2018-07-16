import { query } from '@pluginjs/dom'
import List from '@pluginjs/list'

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

const element = query('#disabled .example-locale')
List.of(element, {
  locale: 'zh',
  data,
  disabled: true
})

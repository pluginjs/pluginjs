import { query } from '@pluginjs/dom'
import List from '@pluginjs/list'

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

const element = query('#locale .example-locale')
List.of(element, {
  locale: 'zh',
  data
})

import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const dataGroup = [
  {
    id: 'programming languages',
    list: ['Swift', 'JAVA', 'C++', 'Go', 'Python', 'Java Script']
  },
  {
    id: 'countries',
    list: [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]
  }
]

const element = query('#group .auto-complete-group')
AutoComplete.of(element, {
  data: dataGroup,
  highlight: true,
  group: true
})

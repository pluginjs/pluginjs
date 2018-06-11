import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
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

const element = query('.auto-complete-group', render(html, query('#group')))
AutoComplete.of(element, {
  data: dataGroup,
  highlight: true,
  group: true
})

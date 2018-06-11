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

const element = query('.auto-complete-ajax', render(html, query('#ajax')))
AutoComplete.of(element, {
  ajax: true,
  group: true,
  source() {
    const _data = dataGroup
    this.handleEl(_data)
  },
  render(data) {
    return `<span class="test">${data.label}<span>${data.value}</span></span>`
  }
})

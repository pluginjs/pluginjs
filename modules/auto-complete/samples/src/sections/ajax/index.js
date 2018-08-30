import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = [
  {
    id: 'programming languages',
    list: ['Swift', 'JAVA', 'C++', 'Go', 'Python', 'Java Script']
  },
  {
    id: 'countries',
    list: [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]
  }
]

const element = query('#ajax .auto-complete-ajax')
AutoComplete.of(element, {
  ajax: true,
  group: true,
  source(resolveData) {
    console.log(this)
    console.log(resolveData)
    this.resolveData(source)
  },
  render(data) {
    return `<span class="test">${data.label}</span>`
  }
})

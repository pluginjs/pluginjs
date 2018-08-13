import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]

const element = query('#render .auto-complete-render')
AutoComplete.of(element, {
  source,
  highlight: true,
  render(data) {
    return `<span class="test">${data.label}<span>${data.value}</span></span>`
  }
})

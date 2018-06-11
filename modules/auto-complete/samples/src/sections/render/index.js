import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AutoComplete from '@pluginjs/auto-complete'

const dataArr = [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]

const element = query('.auto-complete-render', render(html, query('#render')))
AutoComplete.of(element, {
  data: dataArr,
  highlight: true,
  render(data) {
    return `<span class="test">${data.label}<span>${data.value}</span></span>`
  }
})

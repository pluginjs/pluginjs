import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AutoComplete from '@pluginjs/auto-complete'

const dataArr = [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]

const element = query('.auto-complete-label-arr', render(html, query('#arr')))
AutoComplete.of(element, {
  data: dataArr
})

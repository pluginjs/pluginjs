import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AutoComplete from '@pluginjs/auto-complete'

const dataObj = [
  { label: 'England', value: 'UK' },
  { label: 'China', value: 'CN' },
  { label: 'America', value: 'USA' }
]

const element = query('.auto-complete-label-obj', render(html, query('#obj')))
AutoComplete.of(element, {
  data: dataObj
})

import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AutoComplete from '@pluginjs/auto-complete'

const data = [
  'JAVA',
  'Java Script',
  'Go',
  'Swift',
  'C++',
  '易语言',
  'C#',
  'Python',
  'Ruby'
]

const element = query(
  '.auto-complete-highlight',
  render(html, query('#highlight'))
)
AutoComplete.of(element, {
  highlight: true,
  data
})

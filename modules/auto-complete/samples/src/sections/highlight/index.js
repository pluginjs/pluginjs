import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = [
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

const element = query('#highlight .auto-complete-highlight')
AutoComplete.of(element, {
  highlight: true,
  source
})

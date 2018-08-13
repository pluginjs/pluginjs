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

const element = query('#input .input')
AutoComplete.of(element, { source })

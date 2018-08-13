import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = [
  { label: 'England', value: 'UK' },
  { label: 'China', value: 'CN' },
  { label: 'America', value: 'USA' }
]

const element = query('#obj .auto-complete-label-obj')
AutoComplete.of(element, {
  source
})

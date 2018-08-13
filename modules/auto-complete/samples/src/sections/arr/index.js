import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]

const element = query('#arr .auto-complete-label-arr')
AutoComplete.of(element, {
  source
})

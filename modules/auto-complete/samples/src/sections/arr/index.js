import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const dataArr = [['England', 'UK'], ['China', 'CN'], ['America', 'USA']]

const element = query('#arr .auto-complete-label-arr')
AutoComplete.of(element, {
  data: dataArr
})

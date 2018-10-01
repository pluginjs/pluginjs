import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#disable-hide-selected .example')
MultiSelect.of(element, {
  hideSelected: false
})

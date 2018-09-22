import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#filterable .example')
MultiSelect.of(element, {
  filterable: true,
  clearable: true
})

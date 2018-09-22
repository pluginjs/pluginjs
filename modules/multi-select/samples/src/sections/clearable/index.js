import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#clearable .example')
MultiSelect.of(element, {
  clearable: true
})

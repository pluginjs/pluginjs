import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#filterable .example')
Select.of(element, {
  filterable: true,
  clearable: true
})

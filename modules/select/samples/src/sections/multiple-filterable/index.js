import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#multiple-filterable .example-multiple-filterable')

Select.of(element, {
  multiple: true,
  filterable: true
})

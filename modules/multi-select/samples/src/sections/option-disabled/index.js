import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#option-disabled .example')

MultiSelect.of(element, {})

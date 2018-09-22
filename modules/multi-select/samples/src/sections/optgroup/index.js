import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#optgroup .example')

MultiSelect.of(element, {})

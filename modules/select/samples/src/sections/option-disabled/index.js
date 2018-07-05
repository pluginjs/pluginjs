import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#option-disabled .example-option-disabled')

Select.of(element, {})

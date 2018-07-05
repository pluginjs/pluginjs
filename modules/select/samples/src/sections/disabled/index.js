import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#disabled .example-disabled')

Select.of(element, {})

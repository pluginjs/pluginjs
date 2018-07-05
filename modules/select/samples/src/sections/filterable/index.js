import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#filterable .example-filterable')

Select.of(element, { filterable: true })

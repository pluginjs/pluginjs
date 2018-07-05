import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#multiple .example-multiple')

Select.of(element, { multiple: true })

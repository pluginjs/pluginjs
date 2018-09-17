import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#clearable .example')
Select.of(element, {
  clearable: true
})

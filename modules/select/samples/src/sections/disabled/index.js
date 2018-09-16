import { queryAll } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const elements = queryAll('#disabled .example')
elements.forEach(element => {
  Select.of(element)
})

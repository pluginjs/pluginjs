import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#clearable #calendar')
DatePicker.of(element, {
  clearable: true
})

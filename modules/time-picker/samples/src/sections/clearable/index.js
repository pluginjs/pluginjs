import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#clearable .time-picker')
TimePicker.of(element, {
  clearable: true
})

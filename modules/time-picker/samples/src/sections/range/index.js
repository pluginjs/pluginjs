import { queryAll } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const elements = queryAll('#range .time-picker')
elements.forEach(el => {
  TimePicker.of(el)
})

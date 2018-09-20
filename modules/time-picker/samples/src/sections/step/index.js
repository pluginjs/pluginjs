import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#step .time-picker-step')
TimePicker.of(element, {
  min: '9:00',
  max: '12:00',
  step: 5
})

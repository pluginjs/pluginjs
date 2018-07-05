import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#step-function .time-picker-step-func')
TimePicker.of(element, {
  step(i) {
    return i % 2 ? 15 : 45
  }
})

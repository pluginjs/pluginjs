import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#time-picker-12 .time-picker-12')
TimePicker.of(element, { use24HourFormat: false })

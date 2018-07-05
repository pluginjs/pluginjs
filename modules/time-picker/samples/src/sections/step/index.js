import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#step .time-picker-step')
TimePicker.of(element, { step: 80 })

import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#default .time-picker')
TimePicker.of(element, {})

import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#disabled .time-picker')
TimePicker.of(element, { disabled: true })

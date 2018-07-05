import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#range #calendar-range')
DatePicker.of(element, { mode: 'range' })

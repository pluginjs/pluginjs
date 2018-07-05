import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#initialized #calendar-input')
DatePicker.of(element, {})

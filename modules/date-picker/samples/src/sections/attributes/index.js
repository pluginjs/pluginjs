import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#attributes #calendar-attributes')
DatePicker.of(element, {})

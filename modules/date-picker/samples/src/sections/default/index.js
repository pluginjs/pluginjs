import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#default #calendar')
DatePicker.of(element, {})

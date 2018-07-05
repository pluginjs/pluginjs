import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#multiple #calendar-multiple')
DatePicker.of(element, { mode: 'multiple', calendars: '4' })

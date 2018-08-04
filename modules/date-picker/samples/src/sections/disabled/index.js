import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#disabled #calendar-multiple')
DatePicker.of(element, { mode: 'multiple', calendars: '4', disabled: true })

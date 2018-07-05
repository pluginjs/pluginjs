import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#displayMode #calendar-api-displayMode')
DatePicker.of(element, { displayMode: 'inline' })

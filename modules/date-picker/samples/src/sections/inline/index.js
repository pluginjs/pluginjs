import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#inline #calendar-api-inline')
DatePicker.of(element, { inline: true })

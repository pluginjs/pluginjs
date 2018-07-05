import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#MSingle #calendar-mobile-single')
DatePicker.of(element, { mobileMode: true })

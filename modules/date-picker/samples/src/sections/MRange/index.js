import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#MRange #calendar-mobile-range')
DatePicker.of(element, {
  mode: 'range',
  mobileMode: true
})

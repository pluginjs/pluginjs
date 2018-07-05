import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#MMultiple #calendar-mobile-multiple')
DatePicker.of(element, {
  mode: 'multiple',
  mobileMode: true
})

import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query('#disabled #calendar-mobile-multiple')
DatePicker.of(element, {
  mode: 'multiple',
  mobileMode: true,
  disabled: true
})

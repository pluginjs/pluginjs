import { query } from '@pluginjs/dom'
import DatePicker from '@pluginjs/date-picker'

const element = query(' #disabled  #calendar-mobile-disabled')
DatePicker.of(element, {
  mode: 'multiple',
  disabled: true
})

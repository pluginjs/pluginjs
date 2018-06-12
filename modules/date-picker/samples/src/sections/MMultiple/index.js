import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query(
  '#calendar-mobile-multiple',
  render(html, query('#MMultiple'))
)
DatePicker.of(element, {
  mode: 'multiple',
  mobileMode: true
})

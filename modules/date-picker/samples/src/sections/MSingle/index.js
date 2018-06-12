import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query(
  '#calendar-mobile-single',
  render(html, query('#MSingle'))
)
DatePicker.of(element, { mobileMode: true })

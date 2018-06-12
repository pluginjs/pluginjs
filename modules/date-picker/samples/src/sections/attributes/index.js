import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query(
  '#calendar-attributes',
  render(html, query('#attributes'))
)
DatePicker.of(element, {})

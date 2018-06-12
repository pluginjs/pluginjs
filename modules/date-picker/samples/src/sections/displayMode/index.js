import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query(
  '#calendar-api-displayMode',
  render(html, query('#displayMode'))
)
DatePicker.of(element, { displayMode: 'inline' })

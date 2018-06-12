import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query('#calendar-mobile-range', render(html, query('#MRange')))
DatePicker.of(element, {
  mode: 'range',
  mobileMode: true
})

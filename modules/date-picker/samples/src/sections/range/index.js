import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query('#calendar-range', render(html, query('#range')))
DatePicker.of(element, { mode: 'range' })

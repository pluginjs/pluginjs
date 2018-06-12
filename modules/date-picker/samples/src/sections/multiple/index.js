import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import DatePicker from '@pluginjs/date-picker'

const element = query('#calendar-multiple', render(html, query('#multiple')))
DatePicker.of(element, { mode: 'multiple', calendars: '4' })

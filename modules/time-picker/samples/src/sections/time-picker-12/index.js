import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TimePicker from '@pluginjs/time-picker'

const element = query('.time-picker-12', render(html, query('#time-picker-12')))
TimePicker.of(element, { use24HourFormat: false })

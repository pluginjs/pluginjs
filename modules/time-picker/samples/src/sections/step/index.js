import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TimePicker from '@pluginjs/time-picker'

const element = query('.time-picker-step', render(html, query('#step')))
TimePicker.of(element, { step: 80 })

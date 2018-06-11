import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TimePicker from '@pluginjs/time-picker'

const element = query('.time-picker', render(html, query('#default')))
TimePicker.of(element, {})

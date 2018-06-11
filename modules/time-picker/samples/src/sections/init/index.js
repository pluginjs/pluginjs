import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TimePicker from '@pluginjs/time-picker'

const element = query('.example-input', render(html, query('#init')))
TimePicker.of(element, {})

import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TimePicker from '@pluginjs/time-picker'

const element = query(
  '.time-picker-step-func',
  render(html, query('#step-function'))
)
TimePicker.of(element, {
  step(i) {
    return i % 2 ? 15 : 45
  }
})

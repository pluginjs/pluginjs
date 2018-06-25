import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import InputMask from '@pluginjs/input-mask'

const element = query('#input-mask-time-12', render(html, query('#hour')))
InputMask.of(element, {
  type: 'time',
  hours: '12'
})

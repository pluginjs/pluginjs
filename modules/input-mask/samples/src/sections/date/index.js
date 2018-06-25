import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import InputMask from '@pluginjs/input-mask'

const element = query('#input-mask-date', render(html, query('#date')))
InputMask.of(element, {
  type: 'date'
})

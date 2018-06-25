import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import InputMask from '@pluginjs/input-mask'

const element = query('#input-mask-time', render(html, query('#time')))
InputMask.of(element, {
  type: 'time'
})

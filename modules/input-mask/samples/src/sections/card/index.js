import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import InputMask from '@pluginjs/input-mask'

const element = query('#input-mask-card', render(html, query('#card')))
InputMask.of(element, {
  type: 'card'
})

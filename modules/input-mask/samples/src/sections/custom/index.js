import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import InputMask from '@pluginjs/input-mask'

const element = query('#input-mask-custom', render(html, query('#custom')))
InputMask.of(element, {
  type: 'custom',
  delimiter: '-',
  blocks: [2, 3, 5]
})

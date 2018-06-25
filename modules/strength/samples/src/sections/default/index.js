import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Strength from '@pluginjs/spinner'

const element = query('.password-input', render(html, query('#default')))

Strength.of(element, {
  locale: 'zh'
})

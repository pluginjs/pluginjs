import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Radio from '@pluginjs/radio'

const element = query('input', render(html, query('#jsInline')))
Radio.of(element, {
  classes: {
    icon: 'icon-check-mini'
  }
})

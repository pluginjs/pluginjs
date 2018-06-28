import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dots from '@pluginjs/dots'

const element = query('.example-vertical', render(html, query('#vertical')))
Dots.of(element, {
  direction: 'vertical',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

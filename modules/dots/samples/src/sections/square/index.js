import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dots from '@pluginjs/dots'

const element = query('.example-square', render(html, query('#square')))
Dots.of(element, {
  type: 'square',
  valueFrom: 'text',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

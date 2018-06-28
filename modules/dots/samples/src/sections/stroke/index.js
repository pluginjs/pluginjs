import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dots from '@pluginjs/dots'

const element = query('.example-stroke', render(html, query('#stroke')))
Dots.of(element, {
  type: 'stroke',
  valueFrom: 'text',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

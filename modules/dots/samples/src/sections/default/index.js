import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dots from '@pluginjs/dots'

const element = query('.example-default', render(html, query('#default')))
Dots.of(element, {
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

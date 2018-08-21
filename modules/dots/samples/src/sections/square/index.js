import { query } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const element = query('#square .example-square')
Dots.of(element, {
  type: 'square',
  valueFrom: 'text',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

const el = query('#square .example-square-light')
Dots.of(el, {
  type: 'light square',
  valueFrom: 'text',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

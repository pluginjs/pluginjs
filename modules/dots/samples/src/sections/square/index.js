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

import { query } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const element = query('#stroke .example-stroke')
Dots.of(element, {
  type: 'stroke',
  valueFrom: 'text',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

const el = query('#stroke .example-stroke-light')
Dots.of(el, {
  type: 'light stroke',
  valueFrom: 'text',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

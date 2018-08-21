import { query } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const element = query('#vertical .example-vertical')
Dots.of(element, {
  direction: 'vertical',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

const el = query('#vertical .example-vertical-light')
Dots.of(el, {
  type: 'light',
  direction: 'vertical',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

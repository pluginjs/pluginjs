import { query } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const element = query('#default .example-default')
Dots.of(element, {
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

import { query } from '@pluginjs/dom'
import Dots from '@pluginjs/dots'

const element = query('#default .example-default')
Dots.of(element, {
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

const el = query('#default .example-default-light')
Dots.of(el, {
  type: 'light',
  onChange(val) {
    console.info(`select: ${val}`)
  }
})

// const elementDisabled = query('#default .example-default-disabled')
// Dots.of(elementDisabled, {
//   type: 'disabled',
//   onChange(val) {
//     console.info(`select: ${val}`)
//   }
// })

// const elDisabled = query('#default .example-default-light-disabled')
// Dots.of(elDisabled, {
//   type: 'light disabled',
//   onChange(val) {
//     console.info(`select: ${val}`)
//   }
// })

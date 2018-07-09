import { query } from '@pluginjs/dom'
import BeforeAfter from '@pluginjs/before-after'

const horizontal = query('#rectangle .pj-beforeAfter-horizontal')
BeforeAfter.of(horizontal, {
  /** options **/
  direction: 'horizontal'
})

const vertical = query('#rectangle .pj-beforeAfter-vertical')
BeforeAfter.of(vertical, {
  /** options **/
  direction: 'vertical'
})

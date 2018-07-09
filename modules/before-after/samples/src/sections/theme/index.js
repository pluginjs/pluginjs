import { query } from '@pluginjs/dom'
import BeforeAfter from '@pluginjs/before-after'

const horizontal = query('#theme .pj-beforeAfter-horizontal')
BeforeAfter.of(horizontal, {
  /** options **/
  direction: 'horizontal'
})

const vertical = query('#theme .pj-beforeAfter-vertical')
BeforeAfter.of(vertical, {
  /** options **/
  direction: 'vertical'
})

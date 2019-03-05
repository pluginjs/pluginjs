import { query } from '@pluginjs/dom'
import ScrollTo from '@pluginjs/scroll-to'

const element = query('#default .nav-main')
ScrollTo.of(element, {
  selector: '.nav-item'
  /** options **/
})

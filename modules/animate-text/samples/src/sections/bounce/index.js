import { query } from '@pluginjs/dom'
import AnimateText from '@pluginjs/animate-text'

const elementA = query('#bounce .animate-text-1')
const elementB = query('#bounce .animate-text-2')
const elementC = query('#bounce .animate-text-3')
AnimateText.of(elementA, {
  /** options **/
  type: 'word'
})
AnimateText.of(elementB, {
  /** options **/
  type: 'all'
})
AnimateText.of(elementC, {
  /** options **/
  type: 'char'
})

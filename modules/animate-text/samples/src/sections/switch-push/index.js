import { query } from '@pluginjs/dom'
import AnimateText from '@pluginjs/animate-text'

const element = query('#switch-push .animate-text')
AnimateText.of(element, {
  /** options **/
  alt: ['beautiful flowers', 'crispy cookies', 'everying you wish']
})

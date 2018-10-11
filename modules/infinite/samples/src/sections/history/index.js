import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

const element = query('#history .infinite')
Infinite.of(element, {
  item: 'p',
  history: 'push',
  url: '.next-link'
})

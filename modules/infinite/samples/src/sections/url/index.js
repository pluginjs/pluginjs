import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

const element = query('#url .infinite')
Infinite.of(element, {
  item: 'p',
  url: '.next-link'
})

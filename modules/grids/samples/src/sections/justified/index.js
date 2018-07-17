import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#justified .grids')
Grids.of(element, {
  itemSelector: '.grids-item',
  gutter: 20,
  minHeight: 260,
  model: 'justified'
})

import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#nested .grids')
Grids.of(element, {
  itemSelector: '.grids-item',
  gutter: 20,
  model: 'nested',
  hoverPrimary: true
})

import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#default .grids')
Grids.of(element, {
  itemSelector: '.grids-item',
  maxColumn: 5,
  gutter: 20
})

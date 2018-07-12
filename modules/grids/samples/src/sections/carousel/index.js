import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#carousel .grids')
Grids.of(element, {
  itemSelector: '.grids-item',
  maxColumn: 3,
  gutter: 20,
  carousel: {
    loop: true,
    pagination: true,
    arrows: true,
    arrowConfig: {
      type: 'square solid'
    }
  }
})

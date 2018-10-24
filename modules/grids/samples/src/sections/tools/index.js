import { query } from '@pluginjs/dom'
import Grids from '@pluginjs/grids'

const element = query('#tools .grids')
Grids.of(element, {
  itemSelector: '.grids-item',
  maxColumn: 5,
  gutter: 20,
  toolbar: {
    filters: true,
    sort: true,
    reverse: true
  }
})

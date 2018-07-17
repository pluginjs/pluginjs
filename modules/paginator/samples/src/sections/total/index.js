import { query } from '@pluginjs/dom'
import Paginator from '@pluginjs/paginator'

const element = query('#total .paginator-total')
Paginator.of(element, {
  totalItems: 10,
  itemsPerPage: 1,
  currentPage: 3,
  list: {
    visibleSize: {
      0: 3,
      960: 5,
      1280: 7
    }
  },
  layout: 'total, prev, list, next',
  onChange(page) {
    const url = `?page=${page}`
    return url
  }
})

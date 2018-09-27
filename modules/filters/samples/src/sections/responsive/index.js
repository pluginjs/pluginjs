import { query } from '@pluginjs/dom'
import Filter from '@pluginjs/filters'

const element = query('#responsive .pj-filters')
Filter.of(element, {
  responsive: true
})

import { query } from '@pluginjs/dom'
import Filters from '@pluginjs/filters'

const element = query('#group .pj-filters')
Filters.of(element, {})

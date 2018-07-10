import { query } from '@pluginjs/dom'
import Filters from '@pluginjs/filters'

const element = query('#defaults .pj-filters')
Filters.of(element, {})

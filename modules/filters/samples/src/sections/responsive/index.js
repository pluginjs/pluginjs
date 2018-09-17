import { query } from '@pluginjs/dom'
import Filter from '@pluginjs/filters'

const element = query('#responsive .pj-filters')
Filter.of(element, {
  responsive: true,
  items: [
    {
      text: 'ALL',
      id: 'all'
    },
    {
      text: 'PRICING',
      id: 'pricing'
    },
    {
      text: 'DESIGN',
      id: 'design'
    },
    {
      text: 'WEBSITE',
      id: 'website'
    },
    {
      text: 'TECHNOLOGY',
      id: 'technology'
    }
  ]
})

import { query } from '@pluginjs/dom'
import Filter from '@pluginjs/filters'

const element = query('#responsive .pj-filters')
Filter.of(element, {
  responsive: true,
  items: [
    {
      text: 'All',
      id: 'All'
    },
    {
      text: 'Wireframe',
      id: 'Wireframe'
    },
    {
      text: 'Design',
      id: 'design'
    },
    {
      text: 'Website',
      id: 'website'
    },
    {
      text: 'Technology',
      id: 'technology'
    }
  ]
})

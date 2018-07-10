import { query } from '@pluginjs/dom'
import Filter from '@pluginjs/filters'

const element = query('#responsive .pj-filters')
Filter.of(element, {
  theme: 'line',
  responsive: true,
  items: [
    {
      text: 'All',
      id: 'all'
    },
    {
      text: 'UI Kits',
      id: 'ui-kits'
    },
    {
      text: 'Themes',
      id: 'themes'
    },
    {
      text: 'Wireframe',
      id: 'wireframe'
    },
    {
      text: 'Icons',
      id: 'icons'
    },
    {
      text: 'Sounds',
      id: 'sounds'
    }
  ]
})

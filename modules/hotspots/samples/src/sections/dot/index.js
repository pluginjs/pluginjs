import { query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'

const element = query('#dot .example')
Hotspots.of(element, {
  data: [
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '50%'],
      type: 'dot'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '50%'],
      type: 'dot',
      skin: 'md'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '50%'],
      type: 'dot',
      skin: 'lg'
    }
  ]
})

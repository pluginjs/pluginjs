import { query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'

const element = query('#icon .example')

Hotspots.of(element, {
  icon: 'pj-icon pj-icon-add',
  data: [
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '15%'],
      type: 'icon'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '15%'],
      type: 'icon',
      skin: 'md'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '15%'],
      type: 'icon',
      skin: 'lg'
    },

    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '50%'],
      type: 'icon',
      skin: 'outline'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '50%'],
      type: 'icon',
      skin: 'outline md'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '50%'],
      type: 'icon',
      skin: 'outline lg'
    },

    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '85%'],
      type: 'icon',
      skin: 'solid'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '85%'],
      type: 'icon',
      skin: 'solid md'
    },
    {
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '85%'],
      type: 'icon',
      skin: 'solid lg'
    }
  ]
})

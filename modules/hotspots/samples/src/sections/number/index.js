import { query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'

const element = query('#number .example')

Hotspots.of(element, {
  data: [
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '15%'],
      type: 'number'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '15%'],
      type: 'number',
      skin: 'md'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '15%'],
      type: 'number',
      skin: 'lg'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '50%'],
      type: 'number',
      skin: 'outline'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '50%'],
      type: 'number',
      skin: 'outline md'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '50%'],
      type: 'number',
      skin: 'outline lg'
    },

    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '85%'],
      type: 'number',
      skin: 'solid'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '85%'],
      type: 'number',
      skin: 'solid md'
    },
    {
      number: '9',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '85%'],
      type: 'number',
      skin: 'solid lg'
    }
  ]
})

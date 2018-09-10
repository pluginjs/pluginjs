import { query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'

const element = query('#text .example')

Hotspots.of(element, {
  data: [
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '15%'],
      type: 'text'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '15%'],
      type: 'text',
      skin: 'md'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '15%'],
      type: 'text',
      skin: 'lg'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '50%'],
      type: 'text',
      skin: 'outline'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '50%'],
      type: 'text',
      skin: 'outline md'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '50%'],
      type: 'text',
      skin: 'outline lg'
    },

    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['15%', '85%'],
      type: 'text',
      skin: 'solid'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['50%', '85%'],
      type: 'text',
      skin: 'solid md'
    },
    {
      text: 'Text',
      title: 'Lorem ipsum',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
      position: ['85%', '85%'],
      type: 'text',
      skin: 'solid lg'
    }
  ]
})

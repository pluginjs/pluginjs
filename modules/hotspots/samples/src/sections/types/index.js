import { queryAll, query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'

const section = query('#types')
queryAll('.pj-hotspots', section).map(element =>
  Hotspots.of(element, {
    icon: 'pj-icon pj-icon-add',
    data: [
      {
        title: 'Lorem ipsum',
        content:
          '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
        position: ['19%', '78%'],
        type: 'dot'
      },
      {
        text: 'Book',
        title: 'Lorem ipsum',
        content:
          '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
        position: ['62.5%', '57%'],
        type: 'text'
      },
      {
        icon: 'pj-icon pj-icon-add',
        title: 'Lorem ipsum',
        content:
          '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
        position: ['38%', '32%'],
        type: 'icon'
      },
      {
        number: '6',
        title: 'Lorem ipsum',
        content:
          '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
        position: ['59%', '10%'],
        type: 'number'
      },
      {
        text: 'Lorem',
        title: 'Lorem ipsum',
        content:
          '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>',
        position: ['27%', '60%'],
        type: 'hide'
      }
    ]
  })
)

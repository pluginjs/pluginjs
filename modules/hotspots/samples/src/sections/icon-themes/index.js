import { queryAll } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'

queryAll('#icon-themes .pj-hotspots').map(element =>
  Hotspots.of(element, {
    icon: 'icon icon-add',
    data: [
      {
        placement: 'top',
        title: '18" wheels',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['38%', '74%'],
        skin: 'solid'
      },
      {
        placement: 'right',
        title: 'TFSI® engine',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['39.5%', '35%'],
        skin: 'bordered'
      },
      {
        placement: 'right',
        title: 'LED Headlights',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['30%', '52%'],
        skin: 'solid shadow'
      },
      {
        placement: 'right',
        title: 'Singleframe® grille',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['51%', '35%']
      }
    ]
  })
)

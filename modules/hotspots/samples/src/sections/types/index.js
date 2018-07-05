import { queryAll, query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'
import escapeHTML from '../escape-html'

const section = query('#types')
queryAll('.hotspots-car', section).map(element =>
  Hotspots.of(element, {
    icon: 'fa fa-map-marker',
    data: [
      {
        placement: 'top',
        title: '18" wheels',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['61%', '68%']
      },
      {
        placement: 'right',
        title: 'TFSI® engine',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['35%', '45%']
      },
      {
        placement: 'right',
        title: 'LED Headlights',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['38%', '55%']
      },
      {
        placement: 'right',
        title: 'Singleframe® grille',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['27%', '60%']
      },
      {
        placement: 'bottom',
        title: 'S line® exterior',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        position: ['75%', '30%']
      }
    ]
  })
)

Hotspots.of(query('.hotspots-car-number', section), {
  icon: 'fa fa-map-marker',
  data: [
    {
      placement: 'top',
      number: '1',
      title: '18" wheels',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      position: ['61%', '68%']
    },
    {
      placement: 'right',
      number: '2',
      title: 'TFSI® engine',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      position: ['35%', '45%']
    },
    {
      placement: 'right',
      number: '3',
      title: 'LED Headlights',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      position: ['38%', '55%']
    },
    {
      placement: 'right',
      number: '4',
      title: 'Singleframe® grille',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      position: ['27%', '60%']
    },
    {
      placement: 'bottom',
      number: '5',
      title: 'S line® exterior',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      position: ['75%', '30%']
    }
  ]
})

Hotspots.of(query('.hotspots-room', section), {
  icon: 'fa fa-map-marker',
  data: [
    {
      text: 'Chair',
      title: 'Chair - 20$',
      content: escapeHTML`<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p><a href=\'#\'>Buy</a>`,
      position: ['33%', '65%']
    },
    {
      text: 'Lamp',
      title: 'Lamp - 15$',
      content: escapeHTML`<p>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p><p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. </p><a href=\'#\'>Buy</a>`,
      position: ['44.5%', '30%']
    },
    {
      text: 'Cabinet',
      title: 'Cabinet - 50$',
      content: escapeHTML`<p>Nulla consequat massa quis enim. </p><a href=\'#\'>Buy</a>`,
      position: ['54%', '63%']
    },
    {
      text: 'Frame',
      title: 'Frame - 10$',
      content: escapeHTML`<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p><a href=\'#\'>Buy</a>`,
      position: ['56.6%', '30%']
    }
  ]
})

import { queryAll } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'
import escapeHTML from '../escape-html'

queryAll('#text-skin .pj-hotspots').map(element =>
  Hotspots.of(element, {
    icon: 'fa fa-map-marker',
    type: 'text',
    data: [
      {
        text: 'Chair',
        title: 'Chair - 20$',
        content: escapeHTML`<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p><a href=\'#\'>Buy</a>`,
        position: ['33%', '65%'],
        skin: 'dark solid'
      },
      {
        text: 'Lamp',
        title: 'Lamp - 15$',
        content: escapeHTML`<p>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p><p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. </p><a href=\'#\'>Buy</a>`,
        position: ['44.5%', '30%'],
        skin: 'dark shadow'
      },
      {
        text: 'Cabinet',
        title: 'Cabinet - 50$',
        content: escapeHTML`<p>Nulla consequat massa quis enim. </p><a href=\'#\'>Buy</a>`,
        position: ['54%', '63%'],
        skin: 'dark bordered'
      },
      {
        text: 'Frame',
        title: 'Frame - 10$',
        content: escapeHTML`<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p><a href=\'#\'>Buy</a>`,
        position: ['56.6%', '30%'],
        skin: 'dark text'
      }
    ]
  })
)

import { query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'
import escapeHTML from '../escape-html'

const element = query('#custom .pj-hotspots')

Hotspots.of(element, {
  type: 'icon',
  data: [
    {
      icon: 'fa fa-plus',
      text: 'Chair',
      title: 'Chair - 20$',
      content: escapeHTML`<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p><a href="#">Buy</a>`,
      position: ['33%', '65%']
    },
    {
      icon: 'fa fa-lightbulb-o',
      text: 'Lamp',
      title: 'Lamp - 15$',
      content: escapeHTML`<p>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p><p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. </p><a href=\'#\'>Buy</a>`,
      position: ['44.5%', '30%']
    },
    {
      icon: 'fa fa-plus-square-o',
      text: 'Cabinet',
      title: 'Cabinet - 50$',
      content: escapeHTML`<p>Nulla consequat massa quis enim. </p><a href=\'#\'>Buy</a>`,
      position: ['54%', '63%']
    },
    {
      icon: 'fa fa-hand-o-right',
      text: 'Frame',
      title: 'Frame - 10$',
      content: escapeHTML`<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p><a href=\'#\'>Buy</a>`,
      position: ['56.6%', '30%']
    }
  ]
})

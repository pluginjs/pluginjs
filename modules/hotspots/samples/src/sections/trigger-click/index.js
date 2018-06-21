import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Hotspots from '@pluginjs/hotspots'
import escapeHTML from '../escape-html'

const element = query('.hotspots', render(html, query('#trigger-click')))
Hotspots.of(element, {
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

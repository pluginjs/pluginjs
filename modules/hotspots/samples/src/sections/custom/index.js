import { query } from '@pluginjs/dom'
import Hotspots from '@pluginjs/hotspots'
import escapeHTML from '../escape-html'

const element = query('#custom .pj-hotspots')

Hotspots.of(element, {
  type: 'icon',
  icon: 'pj-icon pj-icon-add',
  skin: 'solid',
  data: [
    {
      text: 'Chair',
      title: 'Chair - 20$',
      content: escapeHTML`<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p><a href="#">Buy</a>`,
      position: ['38%', '74%']
    },
    {
      text: 'Lamp',
      title: 'Lamp - 15$',
      content: escapeHTML`<p>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p><p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. </p><a href=\'#\'>Buy</a>`,
      position: ['39.5%', '35%']
    },
    {
      text: 'Cabinet',
      title: 'Cabinet - 50$',
      content: escapeHTML`<p>Nulla consequat massa quis enim. </p><a href=\'#\'>Buy</a>`,
      position: ['30%', '52%']
    },
    {
      text: 'Frame',
      title: 'Frame - 10$',
      content: escapeHTML`<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p><a href=\'#\'>Buy</a>`,
      position: ['51%', '35%']
    }
  ]
})

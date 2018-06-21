import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Hotspots from '@pluginjs/hotspots'

const element = query('.hotspots', render(html, query('#css')))
Hotspots.of(element, {
  /** options **/
})

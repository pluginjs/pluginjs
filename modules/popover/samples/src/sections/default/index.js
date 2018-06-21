import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Popover from '@pluginjs/popover'

const element = query(
  '[data-toggle="popover"]',
  render(html, query('#default'))
)
Popover.of(element, {
  /** options **/
})

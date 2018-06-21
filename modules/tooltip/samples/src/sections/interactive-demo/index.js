import { html as render, query, queryAll } from '@pluginjs/dom'
import html from './index.html'
import Tooltip from '@pluginjs/tooltip'

queryAll(
  '[data-toggle="tooltip"]',
  render(html, query('#interactive-demo'))
).map(element =>
  Tooltip.of(element, {
    /** options **/
  })
)

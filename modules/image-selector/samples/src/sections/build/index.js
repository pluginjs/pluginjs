import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ImageSelector from '@pluginjs/image-selector'

const element = query(
  '.example-build-by-element',
  render(html, query('#build'))
)
ImageSelector.of(element, {})

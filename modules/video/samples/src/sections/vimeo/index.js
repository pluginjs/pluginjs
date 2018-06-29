import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Video from '@pluginjs/video'

const root = render(html, query('#vimeo'))
const element = query('.video', root)
const instance = Video.of(element, {
  type: 'vimeo',
  id: '119287310'
})
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }
  instance[el.dataset.api]()
})

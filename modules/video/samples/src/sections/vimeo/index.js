import { query } from '@pluginjs/dom'
import Video from '@pluginjs/video'

const root = query('#vimeo')
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

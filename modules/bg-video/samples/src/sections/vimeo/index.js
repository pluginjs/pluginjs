import { query, data } from '@pluginjs/dom'
import BgVideo from '@pluginjs/bg-video'

const root = query('#vimeo')
const element = query('.section', root)
const instance = BgVideo.of(element, {
  type: 'vimeo',
  id: '119287310'
})
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }
  instance[data('api', el)]()
})

import { query, data } from '@pluginjs/dom'
import BgVideo from '@pluginjs/bg-video'

const root = query('#youtube')
const element = query('.section', root)
const instance = BgVideo.of(element, {
  type: 'youtube',
  id: 'r1xohS2u69E'
})
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }
  instance[data('api', el)]()
})

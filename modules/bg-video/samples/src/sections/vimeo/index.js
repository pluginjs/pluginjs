import { query, data } from '@pluginjs/dom'
import BgVideo from '@pluginjs/bg-video'

const root = query('#vimeo')
const element = query('.bg-video', root)
const instance = BgVideo.of(element, {
  type: 'vimeo',
  video: {
    url: '',
    id: '119287310',
    mute: true,
    autoplay: true,
    mobileImage: ''
  }
})
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }
  instance[data('api', el)]()
})

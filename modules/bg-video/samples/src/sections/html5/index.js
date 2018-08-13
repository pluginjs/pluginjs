import { query, data } from '@pluginjs/dom'
import BgVideo from '@pluginjs/bg-video'

const root = query('#html5')
const element = query('.bg-video', root)
const instance = BgVideo.of(element, {
  type: 'html5',
  video: {
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    id: '',
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

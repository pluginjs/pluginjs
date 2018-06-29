import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import BgVideo from '@pluginjs/bg-video'

const root = render(html, query('#html5'))
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
  instance[el.dataset.api]()
})

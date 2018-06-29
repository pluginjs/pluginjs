import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import BgVideo from '@pluginjs/bg-video'

const root = render(html, query('#youtube'))
const element = query('.bg-video', root)
const instance = BgVideo.of(element, {
  type: 'youtube',
  video: {
    url: '',
    id: 'r1xohS2u69E',
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

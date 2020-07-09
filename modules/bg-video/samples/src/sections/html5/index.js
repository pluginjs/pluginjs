import { query, data } from '@pluginjs/dom'
import BgVideo from '@pluginjs/bg-video'

const root = query('#html5')
const element = query('.section', root)
const instance = BgVideo.of(element, {
  type: 'html5',
  url: 'http://vjs.zencdn.net/v/oceans.mp4',
  overlay: 'rgba(255,0,0,20%)'
})
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  if (!el.matches('[data-api]')) {
    return
  }
  instance[data('api', el)]()
})

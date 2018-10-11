import { queryAll } from '@pluginjs/dom'
import Parallax from '@pluginjs/parallax'

const elements = queryAll('#video .parallax')
elements.forEach(el =>
  Parallax.of(el, {
    container: '.section',
    video: {
      type: 'html5',
      url:
        'http://engervall.com/projects/parallax-vanilla/media/Sunrise%20-%207127.mp4',
      muted: true,
      autoplay: true,
      loop: true,
      overlay: false
    }
  })
)

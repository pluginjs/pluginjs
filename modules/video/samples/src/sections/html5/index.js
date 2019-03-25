import { query, data } from '@pluginjs/dom'
import Video from '@pluginjs/video'

const root = query('#html5')
const element = query('.video', root)

let instance = Video.of(element, {
  type: 'html5',
  url: 'http://vjs.zencdn.net/v/oceans.mp4',
  autoplay: true
})
let trigger = true
const instances = {
  load() {
    if (!instance.element) {
      instance = Video.of(element, {
        type: 'html5',
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        autoplay: true
      })
    }
  },
  pause() {
    instance.pause()
  },
  play() {
    instance.play()
  },
  stop() {
    instance.stop()
  },
  volume() {
    const val = parseInt(Math.random() * 100, 10)
    instance.volume(val)
  },
  switchVideo() {
    instance.switchVideo(
      'http://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4'
    )
  },
  currentTime() {
    console.log('currentTime:', instance.currentTime())
  },
  duration() {
    console.log('duration:', instance.duration())
  },
  mute() {
    instance.mute()
  },
  unMute() {
    instance.unMute()
  },
  destroy() {
    instance.destroy()
  },
  setCurrentTime() {
    instance.setCurrentTime('30')
  },
  setSize() {
    if (trigger) {
      instance.setSize('688', '288')
      trigger = false
    } else {
      instance.setSize('928', '388')
      trigger = true
    }
  }
}
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  instances[data('api', el)]()
})

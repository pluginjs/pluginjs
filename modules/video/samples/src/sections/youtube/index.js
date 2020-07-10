import { query, data } from '@pluginjs/dom'
import Video from '@pluginjs/video'

const root = query('#youtube')
const element = query('#youtube .video')
let instance = Video.of(element, {
  type: 'youtube',
  id: 'mN0zPOpADL4'
})
let trigger = true
const instances = {
  load() {
    if (!instance.element) {
      instance = Video.of(element, {
        type: 'youtube',
        id: 'mN0zPOpADL4'
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
    instance.switchVideo('07d2dXHYb94')
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
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  if (!el.matches('[data-api]')) {
    return
  }
  instances[data('api', el)]()
})

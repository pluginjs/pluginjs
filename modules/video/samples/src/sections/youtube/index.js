import { query, data } from '@pluginjs/dom'
import Video from '@pluginjs/video'

const root = query('#youtube')
const element = query('#youtube .video')
let instance = Video.of(element, {
  type: 'youtube',
  id: 'YE7VzlLtp-4',
  poster: 'https://picsum.photos/600?blur'
})
let trigger = true
const instances = {
  load() {
    if (!instance.element) {
      instance = Video.of(element, {
        type: 'youtube',
        id: 'YE7VzlLtp-4'
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
    console.log('volume:', val)
    instance.volume(val)
  },
  switchVideo() {
    instance.switchVideo('V55ZtRHAXRM')
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
    const size = '400'
    if (trigger) {
      instance.setSize(size, size)
      trigger = false
    } else {
      instance.setSize(size * 2, size)
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

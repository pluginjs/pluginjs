import { query } from '@pluginjs/dom'
import Video from '@pluginjs/video'

const root = query('#html5')
const element = query('.video', root)

const instance = Video.of(element, {
  type: 'html5',
  url: 'http://vjs.zencdn.net/v/oceans.mp4'
})
let trigger = true
const instances = {
  load() {
    instance.load()
    instance.setSize('800px', '400px')
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
    const val = parseInt(Math.random() * 100, 1)
    instance.volume(val)
  },
  switchVideo() {
    instance.switchVideo('../../assets/towers.mp4')
  },
  currentTime() {
    console.log('duration:', instance.currentTime())
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
    instance.setCurrentTime('20')
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

  instances[el.dataset.api]()
})

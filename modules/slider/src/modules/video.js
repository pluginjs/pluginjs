import { addClass, removeClass } from '@pluginjs/classes'
import { query, append, remove } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import Base from './base'
import VIDEO from '@pluginjs/video'

class Video extends Base {
  constructor(instance, data, loader) {
    super(instance, data, loader)
    this.isload = false

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('video')
    this.newImage = document.createElement('img')
    this.imageEl = query(`.${this.classes.IMAGE}`, this.element)

    this.videoEl = query(`.${this.classes.VIDEO}`, this.element)

    this.imageEl.style.backgroundImage = `url(${this.data.src})`
    this.newImage.src = this.data.src
    append(this.newImage, this.element)
    this.load(this.newImage)

    bindEvent(
      this.instance.eventName('mousedown'),
      event => {
        event.preventDefault()
      },
      this.imageEl
    )
  }

  loadHandler(target) {
    this.loaded(target)
    remove(this.newImage, this.element)
    this.bind()
  }

  errorHandler(target) {
    return target
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      () => {
        if (!this.instance.swipeable.is('paning')) {
          this.videoLoad()
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.instance.eventName('click'), this.element)
  }

  videoLoad() {
    this.video = VIDEO.of(this.videoEl, {
      type: this.data.videoType,
      url: this.data.href,
      id: this.data.id,
      loop: false,
      controls: true,
      onReady: () => {
        addClass(this.classes.LOADING, this.element)
        this.unbind()
      },
      onLoaded: () => {
        this.isload = true
        addClass(this.classes.ACTIVE, this.element)
        removeClass(this.classes.LOADING, this.element)
      },
      onPlay: () => {
        this.instance.enter('video')
      },
      onPause: () => {
        this.instance.leave('video')
      },
      onDestroy: () => {
        removeClass(this.classes.ACTIVE, this.element)
      }
    })
    this.instance.video = this.video
  }

  reset() {
    if (this.isload) {
      this.bind()
      this.isload = false
    }
  }
}

export default Video

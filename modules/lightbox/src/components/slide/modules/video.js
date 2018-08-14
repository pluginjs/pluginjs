import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, prepend } from '@pluginjs/dom'
import Base from './base'

class Video extends Base {
  constructor(instance) {
    super(instance)

    this.init()
  }

  init() {
    this.videoContainer = this.instance.getElement('video')
    prepend(this.videoContainer, this.content)

    this.bind()
  }

  bind() {
    bindEvent(
      'click',
      e => {
        if (!this.instance.drap) {
          e.stopPropagation()
          addClass(this.classes.LOADING, this.videoContainer)
          if (!this.instance.video) {
            this.createVideo()
          }
        }
      },
      this.videoContainer
    )

    // this.videoContainer.on('mousedown', e => {
    //   e.stopPropagation()
    // })
  }

  createVideo() {
    this.instance.video = Pj.video(this.videoContainer, {
      type: this.sourse,
      url: this.href,
      controls: true,
      onPlay: () => {
        removeClass(this.classes.LOADING, this.videoContainer)
        addClass(this.classes.PLAY, this.videoContainer)
      },
      onDestroy: () => {
        removeClass(this.classes.PLAY, this.videoContainer)
        this.instance.video = ''
      }
    })

    this.instance.video('load')
    // this.instance.video('mute')
  }

  update(index) {
    const data = this.items[index]
    this.href = data.href
    this.sourse = data.sourse
    this.poster = data.poster

    this.setTitle(data.title)

    if (data.loadError) {
      this.updateStatus('error')
      return
    }

    if (!data.loaded) {
      this.updateStatus('loading')
      const loadCallback = () => {
        this.updateStatus('loaded')
        this.updateBg()
      }

      const errorCallback = () => {
        this.updateStatus('error')
      }

      this.loadImage(index, loadCallback, errorCallback)
    } else {
      this.updateStatus('loaded')
      this.updateBg()
    }

    this.index = index
  }

  loadImage(index, loadCallback, errorCallback) {
    const data = this.items[index]

    if (data.loaded || data.loadError) {
      return
    }

    if (!data.hasBind || this.instance.length <= 2) {
      data.img = parseHTML(`<img class=${this.classes.IMG} />`)
      data.img.onload = () => {
        data.loaded = true
        if (typeof loadCallback === 'function') {
          if (index !== this.index) {
            return
          }
          loadCallback()
        }
      }
      data.img.onerror = () => {
        data.loadError = true
        if (typeof errorCallback === 'function') {
          if (index !== this.index) {
            return
          }
          errorCallback()
        }
      }

      data.img.setAttribute('src', this.poster)
      data.hasBind = true
    }
  }

  updateBg() {
    setStyle(
      {
        'background-image': `url(${this.poster})`,
        width: '900px',
        height: '641px'
      },
      this.videoContainer
    )
  }

  updateStatus(status) {
    if (status === 'error') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'load ImageError click open video'
      removeClass(this.classes.HIDE, this.loader)
      // todo   show  error tip
    } else if (status === 'loading') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'loading'
      removeClass(this.classes.HIDE, this.loader)
      // todo    show loadind  tip
    } else if (status === 'loaded') {
      addClass(this.classes.LOADED, this.content)
      addClass(this.classes.HIDE, this.loader)
    }
  }
}

export default Video
ideo

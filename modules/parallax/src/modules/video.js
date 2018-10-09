import Base from './base'
import BgVideo from '@pluginjs/bg-video'

class Video extends Base {
  constructor(instance) {
    super(instance)

    this.initialize()
  }

  initialize() {
    const that = this
    this.element = this.instance.element
    this.video = BgVideo.of(this.element, {
      type: 'html5',
      muted: that.options.videoMuted,
      url: that.options.videoSrc,
      onLoaded() {
        that.instance.loader.hide()
      }
    })
  }
}

export default Video

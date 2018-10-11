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
    let options = this.instance.options.video

    if (this.instance.options.loader) {
      options = Object.assign({}, options, {
        onLoaded() {
          that.instance.loader.hide()
        }
      })
    }

    this.video = BgVideo.of(this.element, options)
  }
}

export default Video

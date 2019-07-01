import { removeClass, addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'

export default class Preview {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.value = instance.options.value
  }

  set(image) {
    let thumbnailUrl
    this.setState(image)
    if (image === '' || typeof image === 'undefined') {
      setStyle('background-image', 'none', this.$image)

      setStyle('background-image', 'none', this.instance.TRIGGER.$fillImage)
    } else if (image || image !== this.instance.options.image) {
      thumbnailUrl = this.instance.options.thumbnail
        ? this.instance.options.thumbnail
        : image
      const IMG = new Image()
      IMG.onload = () => {
        this.instance.value.image = thumbnailUrl
        setStyle(
          'background-image',
          `url('${this.instance.value.image}')`,
          this.$image
        )

        setStyle(
          'background-image',
          `url('${this.instance.value.image}')`,
          this.instance.TRIGGER.$fillImage
        )
      }
      IMG.onerror = () => {
        this.instance.value.image = image
        this.update()
        setStyle('background-image', 'none', this.$image)
        setStyle('background-image', 'none', this.instance.TRIGGER.$fillImage)
      }
      IMG.src = thumbnailUrl
    }
  }

  setState(image) {
    if (!image || image === this.instance.options.image) {
      addClass(this.classes.WRITE, this.$wrap)
    } else {
      removeClass(this.classes.WRITE, this.$wrap)
    }
  }

  clear() {
    this.set('')
  }
}

import { removeClass, addClass } from '@pluginjs/classes'
import { showElement, setStyle } from '@pluginjs/styled'

export default class Preview {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.value = instance.options.value
  }

  set(image) {
    let thumbnailUrl
    this.setState(image)
    this.returnFill(image)
    if (image === '' || typeof image === 'undefined') {
      showElement(this.instance.TRIGGER.$fillImageName)
      setStyle('background-image', 'none', this.$image)

      setStyle('background-image', 'none', this.instance.TRIGGER.$fillImage)
    } else if (image || image !== this.instance.options.image) {
      thumbnailUrl = this.instance.options.thumbnail
        ? this.instance.options.thumbnail
        : image
      const IMG = new Image()
      IMG.onload = () => {
        this.instance.value.image = thumbnailUrl
        this.returnFill(this.instance.value.image)
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
        this.returnFill(image)
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

  returnFill(image) {
    let imgName
    if (!image || image === this.instance.options.image) {
      this.instance.TRIGGER.$fillImageName.textContent = this.instance.translate(
        'placeholder'
      )
    } else {
      imgName = image.match(/([\S]+[/])([\S]+\w+$)/i)[2]
      this.instance.TRIGGER.$fillImageName.textContent = imgName
    }
  }

  clear() {
    this.set(this.value.image)
  }
}

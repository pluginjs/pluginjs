import { query } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { showElement, setStyle } from '@pluginjs/styled'
// import { bindEvent } from '@pluginjs/events'

export default class Preview {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.value = instance.options.value

    this.initialize()
  }

  initialize() {
    this.$image = query(`.${this.classes.IMAGE}`, this.instance.$Panel)
    this.set(this.value.image)
    console.log(this.instance.options.value.image)
    // this.bind()
  }

  set(image) {
    let thumbnailUrl
    this.setState(image)
    this.returnFill(image)
    if (image === '' || typeof image === 'undefined') {
      showElement(this.instance.$fillImageName)
      setStyle('background-image', 'none', this.$image)

      setStyle('background-image', 'none', this.instance.$fillImage)
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
          this.instance.$fillImage
        )
      }
      IMG.onerror = () => {
        this.instance.value.image = image
        this.returnFill(image)
        this.update()
        setStyle('background-image', 'none', this.$image)
        setStyle('background-image', 'none', this.instance.$fillImage)
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
      this.instance.$fillImageName.textContent = this.instance.translate(
        'placeholder'
      )
    } else {
      imgName = image.match(/([\S]+[/])([\S]+\w+$)/i)[2]
      this.instance.$fillImageName.textContent = imgName
    }
  }

  clear() {
    this.set(this.value.image)
  }
}

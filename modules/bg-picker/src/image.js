import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
// import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { compose } from '@pluginjs/utils'

export default class Image {
  constructor(instance) {
    this.instance = instance
    // this.values = instance.options.repeat.values
    // this.defaultValue = instance.options.repeat.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.selectImage.template())(
      {
        classes: this.instance.classes,
        field: this.instance.getClassName(
          this.instance.classes.NAMESPACE,
          'image'
        ),
        image: this.instance.translate('image'),
        changeImage: this.instance.translate('changeImage'),
        selectImage: this.instance.translate('selectImage'),
        removeImage: this.instance.translate('removeImage')
      }
    )
    this.$wrap = parseHTML(html)
    this.bind()
  }
  bind() {
    // change image
    this.image = query('.pj-input', this.$wrap)
    compose(
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGESELECT}`,
        () => {
          // this.addPoster(this.options.selectCover.call(this))
          addClass(this.instance.classes.IMAGESELECTED, this.image)
          addClass(this.instance.classes.SHOW, this.instance.$wrap)
          this.instance.set(this.instance.options.value)
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGECHANGE}`,
        e => {
          if (!this.instance.is('imageChange')) {
            // this.instance.changeImage('https://picsum.photos/200/300')
            this.instance.options.onSelectImage.call(
              this.instance,
              this.instance.changeImage.bind(this.instance)
            )
            addClass(this.instance.classes.SELECTEDDISABLE, e.target)
            this.instance.set(this.instance.options.value)
          }
          this.instance.enter('imageChange')
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGEREMOVE}`,
        () => {
          this.removeImage()

          // this.deletePoster()
          // addClass(this.classes.POSTERSELECTED, this.$poster)
          this.instance.leave('imageChange')
        }
      )
    )(this.$wrap)
  }
  removeImage() {
    const disabled = query(`.${this.instance.classes.IMAGECHANGE}`, this.image)
    // this.data.poster = ''
    removeClass(this.instance.classes.SELECTEDDISABLE, disabled)
    this.instance.options.value.image =
      'https://picsum.photos/200/300?image=1068'
    this.instance.clear()
    removeClass(this.instance.classes.SHOW, this.instance.$wrap)

    // setStyle('display', 'none', this.instance.$fill)
    // this.instance.update()
    // setStyle('background-image', 'none', this.$image)
    // setStyle('backgroundImage', 'none', this.$videoPoster)
  }
}

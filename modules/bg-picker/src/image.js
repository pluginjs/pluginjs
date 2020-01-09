import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { compose } from '@pluginjs/utils'

export default class Image {
  constructor(instance) {
    this.instance = instance
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
        selectImage: this.instance.translate('selectImage')
      }
    )
    this.$wrap = parseHTML(html)
    this.image = query('.pj-input', this.$wrap)
    this.instance.$imageName = query(
      `.${this.instance.classes.IMAGENAME}`,
      this.image
    )
    this.bind()
  }

  bind() {
    // change image
    compose(
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGESELECT}`,
        () => {
          this.instance.enter('imageSelecting')
          this.instance.options.selectPicture.call(
            this.instance,
            this.instance.changeImage.bind(this.instance)
          )
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGENAME}`,
        () => {
          addClass(this.instance.classes.IMAGEENTERCHANGE, this.image)
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGECHANGE}`,
        () => {

            this.instance.enter('imageChanging')
            this.instance.options.changePicture.call(
              this.instance,
              this.instance.changeImage.bind(this.instance)
            )
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGEREMOVE}`,
        () => {
          removeClass(this.instance.classes.IMAGEENTERCHANGE, this.image)
          removeClass(this.instance.classes.IMAGECHANGEDDISABLE, this.image)
          this.removeImage()
        }
      )
    )(this.$wrap)
  }

  removeImage() {
    const disabled = query(`.${this.instance.classes.IMAGECHANGE}`, this.image)
    removeClass(this.instance.classes.SELECTEDDISABLE, disabled)
    removeClass(this.instance.classes.IMAGESELECTED, this.image)
    this.instance.value.image = null
    this.instance.element.value = null
    this.instance.set(this.instance.value)
  }

  set(value) {
    const disabled = query(`.${this.instance.classes.IMAGECHANGE}`, this.image)
    const name = query(`.${this.instance.classes.IMAGENAME}`, this.image)
    removeClass(this.instance.classes.IMAGEENTERCHANGE, this.image)
    removeClass(this.instance.classes.IMAGECHANGEDDISABLE, this.image)
    removeClass(this.instance.classes.SELECTEDDISABLE, disabled)
    addClass(this.instance.classes.IMAGESELECTED, this.image)
    name.innerHTML = value
  }
}

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
          this.instance.leave('imageChange')
          addClass(this.instance.classes.IMAGESELECTED, this.image)
          addClass(this.instance.classes.SHOW, this.instance.$wrap)
          removeClass(
            this.instance.classes.SELECTEDDISABLE,
            query(`.${this.instance.classes.IMAGECHANGE}`, this.image)
          )
          this.instance.$imageName = query(
            `.${this.instance.classes.IMAGENAME}`,
            this.image
          )
          this.instance.options.onSelectImage.call(
            this.instance,
            this.instance.changeImage.bind(this.instance)
          )
          this.instance.set(this.instance.value)
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
          if (!this.instance.is('imageChange')) {
            removeClass(this.instance.classes.IMAGEENTERCHANGE, this.image)
            this.instance.options.onChangeImage.call(
              this.instance,
              this.instance.changeImage.bind(this.instance)
            )
            addClass(this.instance.classes.IMAGECHANGEDDISABLE, this.image)
            this.instance.set(this.instance.value)
          }
          this.instance.enter('imageChange')
        }
      ),
      bindEvent(
        this.instance.eventName('click'),
        `.${this.instance.classes.IMAGEREMOVE}`,
        () => {
          removeClass(this.instance.classes.IMAGEENTERCHANGE, this.image)
          removeClass(this.instance.classes.IMAGECHANGEDDISABLE, this.image)
          this.removeImage()
          this.instance.leave('imageChange')
        }
      )
    )(this.$wrap)
  }
  removeImage() {
    const disabled = query(`.${this.instance.classes.IMAGECHANGE}`, this.image)
    removeClass(this.instance.classes.SELECTEDDISABLE, disabled)
    removeClass(this.instance.classes.IMAGESELECTED, this.image)
    this.instance.value.image = ''
    this.instance.element.value = ''
    this.instance.set(this.instance.value)
  }
}

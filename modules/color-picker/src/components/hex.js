// import alpha from './alpha'
import { bindEvent } from '@pluginjs/events'
import {
  query,
  // getObjData,
  // setObjData,
  // find,
  parseHTML,
  parent
  // queryAll
} from '@pluginjs/dom'
// import { getStyle, setStyle } from '@pluginjs/styled'
// import { hasClass, removeClass, addClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
class Hex {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.classes = this.instance.classes
    this.opac = 100
    this.mode = this.instance.asColor.toHEX()
    this.classify = 'HEX'
    this.HSL = this.instance.asColor.toHSL().toUpperCase()
    this.HEX = this.instance.asColor.toHEX().toUpperCase()
    this.RGB = this.instance.asColor.toRGB().toUpperCase()
    this.data = [{ label: this.HEX }, { label: this.HSL }, { label: this.RGB }]
    // this.bind()
    this.init()
  }

  init() {
    this.bulid()
    this.bind()
  }

  bulid() {
    this.$opac = parseHTML(
      `<div class='${this.classes.HEXBOX}'>
        <input class="pj-input ${this.classes.HEXANGLE}" type="text"/>
         <div class="${this.classes.HEXUNIT}">%</div>
       </div>`
    )
    const $selector = parseHTML(
      `<div class='${
        this.classes.HEXMODE
      }'><div><span class="pj-dropdown-trigger"></span><div/></div>`
    )
    this.element.append($selector, this.$opac)

    this.$el = query(`.${this.classes.HEXMODE}>div>span`, this.element)
    this.$selector = query(`.${this.classes.HEXMODE}>div`, this.element)
    this.dropdown = Dropdown.of(this.$el, {
      imitateSelect: true,
      select: this.classify,
      width: parent(this.$selector),
      icon: 'icon-char icon-chevron-down',
      data: this.data
    })
  }

  bind() {
    bindEvent(
      {
        type: 'colorPicker:change',
        handler: ({
          detail: {
            data: [color]
          }
        }) => {
          query(`.${this.classes.HEXANGLE}`, this.$opac).value = parseInt(color.value.a * 100) /* eslint-disable-line */
          this.updateColor(this.dropdown.options.select)
        }
      },
      this.instance.element
    )

    bindEvent(
      {
        type: this.instance.eventName('change'),
        handler: ({ target }) => {
          const color = target.value
          this.update(color)
        }
      },
      this.element
    )

    this.dropdown.options.onChange = res => {
      this.updateColor(res.innerText)

      // this.update(this.instance.asColor)
    }
  }

  updateColor(val) {
    if (val.indexOf('HSL') > -1) {
      this.mode = this.instance.asColor.toHSL().toUpperCase()
    } else if (val.indexOf('RGB') > -1) {
      this.mode = this.instance.asColor.toRGB().toUpperCase()
    } else {
      this.mode = this.instance.asColor.toHEX().toUpperCase()
    }

    this.data = [
      this.instance.asColor.toHEX().toUpperCase(),
      this.instance.asColor.toHSL().toUpperCase(),
      this.instance.asColor.toRGB().toUpperCase()
    ]

    this.$selector.querySelector('span').innerText = this.mode
    this.dropdown.options.select = val
    this.element
      .querySelectorAll('.pj-dropdown-item')
      .forEach((value, index) => {
        value.setAttribute('data-value', this.data[index])
        value.innerText = this.data[index]
      })
  }

  update(value) {
    if (this.instance.asColor.isValid(value)) {
      this.instance.setSolid(value)
      this.updateColor(this.instance.asColor)
    }
  }
}

export default Hex

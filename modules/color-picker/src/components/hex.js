// import alpha from './alpha'
import { bindEvent } from '@pluginjs/events'
import {
  query,
  // getData,
  // setData,
  // find,
  parseHTML
  // parent
  // queryAll
} from '@pluginjs/dom'
import { Color } from '@pluginjs/color'
import Dropdown from '@pluginjs/dropdown'
class Hex {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.classes = this.instance.classes
    this.opac = 100
    this.classify = 'HEX'
    this.color = null

    this.COLOR = new Color()
    this.mode = this.COLOR.toHEX()
    this.HSL = this.COLOR.toHSL().toUpperCase()
    this.HEX = this.COLOR.toHEX().toUpperCase()
    this.RGB = this.COLOR.toRGB().toUpperCase()
    this.data = [
      { label: this.HEX, value: 'HEX' },
      { label: this.HSL, value: 'HSL' },
      { label: this.RGB, value: 'RGB' }
    ]
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
      `<div class='${this.classes.HEXMODE}'><div><div></div><div/></div>`
    )
    this.element.append($selector, this.$opac)

    this.$el = query(`.${this.classes.HEXMODE}>div>div`, this.element)
    // this.$selector = query(`.${this.classes.HEXMODE}>div`, this.element)
    this.dropdown = Dropdown.of(this.$el, {
      target: '+',
      imitateSelect: true,
      value: this.classify,
      data: this.data,
      onChange: res => {
        this.updateColor(res, this.color)
      }
    })
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('change'),
      (e, el, color) => {
        this.color = color
          query(`.${this.classes.HEXANGLE}`, this.$opac).value = parseInt(color.value.a * 100) /* eslint-disable-line */
        this.updateColor(this.dropdown.options.value, color)
      },
      this.instance.element
    )

    bindEvent(
      this.instance.eventName('change'),
      ({ target }) => {
        const color = target.value
        this.update(color)
      },
      this.element
    )
  }

  updateColor(val, color) {
    if (val.indexOf('HSL') > -1) {
      this.mode = color.toHSL().toUpperCase()
    } else if (val.indexOf('RGB') > -1) {
      this.mode = color.toRGB().toUpperCase()
    } else {
      this.mode = color.toHEX().toUpperCase()
    }

    this.data = [
      this.color.toHEX().toUpperCase(),
      this.color.toHSL().toUpperCase(),
      this.color.toRGB().toUpperCase()
    ]

    this.$el.innerText = this.mode
    this.dropdown.options.value = this.mode

    this.element
      .querySelectorAll('.pj-dropdown-item')
      .forEach((value, index) => {
        value.setAttribute('data-value', this.data[index])
        value.innerText = this.data[index]
      })
  }

  update(value) {
    console.log(this.instance.SOLID.color)
    if (this.instance.SOLID.color.isValid(value)) {
      this.instance.SOLID.setSolid(value)
      this.updateColor(this.instance.SOLID.color)
    }
  }
}

export default Hex

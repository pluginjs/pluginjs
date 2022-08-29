import { bindEvent } from '@pluginjs/events'
import { query, parseHTML, attr, append } from '@pluginjs/dom'
import { compose, debounce } from '@pluginjs/utils'
import { Color } from '@pluginjs/color'
import Select from '@pluginjs/select'
import { addClass } from '@pluginjs/classes'

class Hex {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.classes = this.instance.classes

    let color = instance.COLOR
    this.selected = 'HEX'
    this.data = [
      { label: color.toHEX().toUpperCase(), value: 'HEX', selected: true },
      { label: color.toRGB().toUpperCase(), value: 'RGB' },
      { label: color.toHSL().toUpperCase(), value: 'HSL' }
    ]
    this.init()
  }

  init() {
    this.build()
    this.bind()
  }

  build() {
    const $selector = parseHTML(
      `<div class='${this.classes.HEXMODE}'><input type="text" value="${this.data[0].value}" /></div>`
    )

    if(this.instance.module.hexInput) {
      this.$input = parseHTML(
        `<input class="pj-input pj-input-sm ${this.classes.HEXINPUT}" type="text"/>`
      )

      compose(
        attr({ placeholder: this.instance.options.placeholder })
      )(this.$input)

      append(this.$input, this.element)

      addClass(this.classes.HEXWIDTHINPUT, this.element)
    }

    if (this.instance.module.alpha) {
      this.$opac = parseHTML(
        `<div class='${this.classes.HEXBOX}'>
          <input class="pj-input pj-input-sm ${this.classes.HEXANGLE}" type="text" value="${parseInt(this.instance.COLOR.value.a * 100)}"/>
          <div class="${this.classes.HEXUNIT}">%</div>
        </div>`
      )

      append($selector, this.element)
      append(this.$opac, this.element)
    } else {
      append($selector, this.element)
    }

    this.$el = query(`.${this.classes.HEXMODE}>input`, this.element)
    this.SELECT = Select.of(this.$el, {
      source: this.data,
      allSelectTriggerChange: true,
      dropdown: {
        placement: 'bottom-end' // top
      },
      classes: {
        TRIGGER: '{namespace}-trigger pj-input pj-input-sm'
      },
      onChange: selected => {
        this.selected = selected
        this.updateInput(selected, this.instance.COLOR)
      },
      onShow: () => {
        if (!this.instance.is('hexFirstShown')) {
          this.instance.COLOR &&
          this.updateSelect(this.SELECT.element.value, this.instance.COLOR)
          this.instance.enter('hexFirstShown')
        }
      }
    })
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('changeColor'),
      (e, el, color) => {
        console.info(color)
        if (this.instance.module.alpha) {
          this.updateOpac(color) /* eslint-disable-line */
        }

        if(this.instance.module.hexInput) {
          this.updateInput(this.selected, color)
        }

        this.updateSelect(this.selected, color)
      },
      this.instance.element
    )

    if(this.instance.module.hexInput) {
      bindEvent(
        this.instance.eventName('input'),
        debounce(e => {
          if (Color.matchString(e.target.value)) {
            this.instance.setColor(e.target.value)
          }
        }, 1000),
        this.$input
      )
    }

    if (this.instance.module.alpha) {
      bindEvent(
        this.instance.eventName('change'),
        `.${this.classes.HEXANGLE}`,
        ({ target }) => {
          this.updateAlpha(target.value)
        },
        this.$opac
      )
    }
  }

  updateOpac(color) {
    query(`.${this.classes.HEXANGLE}`, this.$opac).value = parseInt(color.value.a * 100)
  }

  updateSelect(format, color) {
    let selected = this.selected
    if (format.indexOf('HSL') > -1) {
      selected = 'HSL'
    } else if (format.indexOf('RGB') > -1) {
      selected = 'RGB'
    } else {
      selected = 'HEX'
    }
    if (selected != this.selected) {
      this.instance.COLOR.format(this.selected)
      this.SELECT.set(this.selected, false)
      this.selected = selected
    }

    this.data = [
      color.toHEX().toUpperCase(),
      color.toRGB().toUpperCase(),
      color.toHSL().toUpperCase()
    ]

    if (typeof NodeList.prototype.forEach !== 'function')  {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    this.element
      .querySelectorAll('.pj-dropdown-item')
      .forEach((value, index) => {
        value.innerText = this.data[index]
      })
  }

  updateInput(format, color) {
    if(this.$input)
      this.$input.value = color.to(format)
  }

  updateAlpha(percent) {
    percent /= 100
    
    this.instance.setColor({ a: `${percent}` })
  }

  update(value) {
    if (this.instance.COLOR.isValid(value)) {
      this.instance.setColor(value)
    }
  }
}

export default Hex

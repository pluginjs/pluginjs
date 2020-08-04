import { addClass, removeClass } from '@pluginjs/classes'
import { append, query, queryAll } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'

class Flip {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.element = instance.element
    this.classes = instance.classes
    this.types = instance.types
    this.labels = instance.labels
    this.times = instance.times
    this.places = instance.places
    this.maximums = instance.maximums

    this.generate()
    this.bind()
  }

  generate() {
    addClass(this.classes.FLIP, this.element)
    this.samples = {}

    this.types.forEach((type, index) => {
      this.samples[type] = {}

      const number = this.instance.getHtml('number', {
        number: this.instance.processTime(this.times[type], this.places[index])
      })

      const label = this.instance.getHtml('label', {
        label: this.labels[index]
      })

      this.samples[type].element = this.instance.getElement('flip', {
        type: this.types[index],
        number,
        label
      })

      this.samples[type].number = queryAll(
        `.${this.classes.NUMBER}`,
        this.samples[type].element
      )
      this.samples[type].label = query(
        `.${this.classes.LABEL}`,
        this.samples[type].element
      )

      append(this.samples[type].element, this.element)
    })
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('update'),
      (e, target, type, value) => {
        this.update(value, type)
      },
      this.element
    )
  }

  update(value, type) {
    const index = this.types.indexOf(type)
    const maximum = this.maximums[index]
    value = Number(value)

    this.samples[type].number.forEach((item, itemIndex) => {
      let newValue

      if (itemIndex < 2) {
        newValue = value > maximum - 2 ? 0 : value + 1
      } else {
        newValue = value
      }

      item.innerHTML = this.instance.processTime(newValue, this.places[index])
    })

    removeClass(this.classes.TURN, this.samples[type].element)

    setTimeout(() => {
      addClass(this.classes.TURN, this.samples[type].element)
    }, 50)
  }
}

export default Flip

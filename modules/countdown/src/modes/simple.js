import { append, query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'

class Simple {
  constructor(instance) {
    this.instance = instance
    this.element = instance.element
    this.classes = instance.classes
    this.types = instance.types
    this.labels = instance.labels
    this.times = instance.times

    this.generate()
    this.bind()
  }

  generate() {
    this.samples = {}

    this.types.forEach((type, index) => {
      this.samples[type] = {}

      const number = this.instance.getHtml('number', {
        number: this.instance.processTime(
          this.times[type],
          this.instance.places[index]
        )
      })

      const label = this.instance.getHtml('label', {
        label: this.labels[index]
      })

      this.samples[type].element = this.instance.getElement('simple', {
        type: this.types[index],
        number,
        label
      })

      this.samples[type].number = query(
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
    this.samples[type].number.innerHTML = value
  }
}

export default Simple

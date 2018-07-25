import { debounce } from '@pluginjs/utils'
import { bindEvent } from '@pluginjs/events'
import { parentWith } from '@pluginjs/dom'

class Search {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.value = ''
    this.bind()
  }

  bind() {
    bindEvent(
      {
        type: this.instance.eventName('keyup.width'),
        handler: () => {
          this.instance.resetLabelWidth()
          this.instance.dropdown.POPPER.scheduleUpdate()
        }
      },
      this.instance.label
    )
    bindEvent(
      {
        type: this.instance.eventName('keyup'),
        handler: debounce(e => {
          const $target =
            e.target === this.instance.label
              ? e.target
              : parentWith(el => el === this.instance.label, e.target)
          const value = $target.value
          if (value === this.value) {
            return
          }

          this.filter(this.instance.data, $target.value)
        }, 300)
      },
      this.instance.label
    )
  }

  filter(data, value) {
    if (
      value === this.value ||
      ((value.length === 0 || value === ' ') &&
        (this.value === null ||
          typeof this.value === 'undefined' ||
          this.value.length === 0))
    ) {
      return
    }

    this.value = value

    const newData = this.instance.query(data, value)

    this.instance.resetList(newData)
    this.instance.dropdown.POPPER.scheduleUpdate()
    this.instance.markItem('first')
  }
}
export default Search

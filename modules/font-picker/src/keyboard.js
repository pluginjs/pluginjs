import { next, prev, query, parent, parentWith } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { removeClass, hasClass } from '@pluginjs/classes'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
  }

  init(el, _package = false) {
    this.instance.enter('keyboard')

    this._package = _package
    this.$list = el
    this.$wrap = this._package
      ? parentWith(hasClass(this.classes.PACKAGE), this.$list[0])
      : parent(this.$list[0])
    this.$input = query('input', this.instance.$search)

    this.$fontList = null
    this.$selected = null

    this.downCount = 1
    this.upCount = 1
    this.bind()
  }

  up() {
    if (!this.instance.is('searching')) {
      if (prev(this.$selected)) {
        return
      }
      this.$selected = prev(this.$selected).focus()
    } else {
      if (!this.$selected) {
        this.$selected = this.$list[0].focus()
      }
      const index = this.$list.findIndex(
        e => this.$selected.dataset.value === e.dataset.value
      )
      if (index <= 0) {
        return
      }

      this.$selected = this.$list[index - 1].focus()
    }

    return
  }

  down() {
    if (!this.instance.is('searching')) {
      if (!this.$selected) {
        this.$selected = this.$list[0].focus()
        return
      }
      if (next(this.$selected)) {
        return
      }
      this.$selected = next(this.$selected).focus()
    } else {
      if (!this.$selected) {
        this.$selected = this.$list[0].focus()
        return
      }
      const index = this.$list.findIndex(
        e => this.$selected.dataset.value === e.dataset.value
      )
      if (index >= this.$list.length - 1) {
        return
      }

      this.$selected = this.$list[index + 1].focus()
    }
    return
  }

  bind() {
    this.instance.options.onSearching = () => {
      this.$list = this.instance.$showFonts
    }

    bindEvent(
      'keydown',
      e => {
        const code = e.keyCode
        const which = e.which

        if (this.instance.$showFonts) {
          this.$list = this.instance.$showFonts
        }

        if (code === 38 && which === 38) {
          this.up()
          e.preventDefault()
        }
        if (code === 40 && which === 40) {
          this.down()
          e.preventDefault()
        }
      },
      this.instance.$panel
    )

    bindEvent(
      'keydown',
      e => {
        const code = e.keyCode
        const which = e.which
        if (code === 27 && which === 27) {
          if (!this._package) {
            this.$input.focus()
          } else {
            this.instance.close(this.$wrap)
            this.unbind()
          }
          e.preventDefault()
        }
      },
      this.$wrap
    )

    bindEvent(
      'keydown',
      e => {
        const code = e.keyCode
        const which = e.which

        if (code === 27 && which === 27) {
          removeClass(this.classes.SEARCHREADY, this.instance.$panel)
          this.instance.leave('searchReady')
          this.$input.blur()
        }

        if (code === 9 && which === 9) {
          removeClass(this.classes.SEARCHREADY, this.instance.$panel)
          this.instance.leave('searchReady')
          this.unbind()
          e.preventDefault()
        }

        if (code === 40 && which === 40) {
          this.down()
          e.preventDefault()
        }

        e.stopPropagation()
        return false
      },
      this.$input
    )
  }

  unbind() {
    removeEvent('keydown', this.instance.$panel)
    removeEvent('keydown', this.$input)
    this.instance.leave('keyboard')
  }
}

export default Keyboard

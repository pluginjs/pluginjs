import anime from 'animejs'
import {
  setStyle,
  contentWidth,
  outerHeight,
  outerWidth
} from '@pluginjs/styled'
import { parentWith } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'
import { compose } from '@pluginjs/utils'

class Animate {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.horizontal = this.instance.options.horizontal
    this.property = this.horizontal ? 'width' : 'height'
    this.initDistance()
    this.instance.$panes.map($pane =>
      setStyle(this.property, `${this.headerDistance}px`, $pane)
    )
    if (this.horizontal) {
      this.instance.$contentInners.map($item =>
        setStyle('width', `${this.contentDistance[0]}px`, $item)
      )
      this.instance.$contentInners.map(($item, index) =>
        setStyle('width', `${this.contentDistance[index]}px`, $item)
      )
    }
  }

  initDistance() {
    if (this.horizontal) {
      this.getPaneSpace()
    }

    this.getHeaderDistance()
    this.getContentDistance()
  }

  getPaneSpace() {
    this.paneSpace =
      outerWidth(true, this.instance.$panes[1]) -
      outerWidth(this.instance.$panes[1])
    return this.paneSpace
  }

  getHeaderDistance() {
    this.headerDistance = outerHeight(true, this.instance.$headers[0]) + 2
  }

  getContentDistance() {
    const innerWidth = contentWidth(this.instance.element)
    const size = this.instance.size
    this.contentDistance = this.instance.$contentInners.map(element => {
      if (this.horizontal) {
        return (
          innerWidth - size * this.headerDistance - (size - 1) * this.paneSpace
        )
      }
      return compose(
        outerHeight,
        compose(
          parentWith,
          hasClass
        )(this.instance.classes.PANECONTENT)
      )(element)
    })
    return this.contentDistance
  }

  resetWidth(immediately = false) {
    if (this.instance.is('built')) {
      return
    }

    const current = this.instance.current

    this.getContentDistance()

    if (this.horizontal) {
      this.instance.$contentInners.map($item =>
        setStyle('width', `${this.contentDistance[0]}px`, $item)
      )
    }

    for (let i = 0; i < current.length; i++) {
      const index = current[i]
      const pane = this.instance.$panes[index]
      const opts = {
        targets: pane,
        duration: immediately ? 1 : 200,
        easing: 'linear'
      }

      opts[this.property] = this.headerDistance + this.contentDistance[index]

      anime(opts)
    }
  }

  open(index, trigger) {
    const pane = this.instance.$panes[index]
    const opts = {
      targets: pane,
      duration: trigger ? 200 : 1,
      easing: 'linear'
    }

    opts[this.property] = this.headerDistance + this.contentDistance[index]

    anime(opts)
  }

  close(index, trigger) {
    const pane = this.instance.$panes[index]
    const opts = {
      targets: pane,
      duration: trigger ? 200 : 1,
      easing: 'linear'
    }

    opts[this.property] = this.headerDistance

    anime(opts)
  }
}
export default Animate

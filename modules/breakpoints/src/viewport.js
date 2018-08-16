import ChangeEvent from './changeEvent'
import MediaQuery from './mediaQuery'
import MediaBuilder from './mediaBuilder'

export class Viewport extends MediaQuery {
  constructor(name, min = 0, max = Infinity, unit = 'px') {
    const media = MediaBuilder.get(min, max, unit)
    super(media)

    this.name = name
    this.min = min
    this.max = max
    this.unit = unit
  }

  destroy() {
    this.off()
  }
}

export class Size extends Viewport {
  constructor(name, min = 0, max = Infinity, unit = 'px') {
    super(name, min, max, unit)

    this.changeListener = () => {
      if (this.isMatched()) {
        ChangeEvent.trigger(this)
      }
    }
    if (this.isMatched()) {
      ChangeEvent.current = this
    }

    this.mql.addListener(this.changeListener)
  }

  destroy() {
    this.mql.removeListener(this.changeHander)

    super.destroy()
  }
}

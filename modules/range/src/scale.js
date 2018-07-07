import { addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { append, parseHTML } from '@pluginjs/dom'

class Scale {
  constructor(instance) {
    this.defaults = {
      scale: {
        valuesNumber: 3,
        gap: 1,
        grid: 5
      }
    }

    this.init(instance)
  }

  init(instance) {
    const opts = Object.assign({}, this.defaults, instance.options.scale)
    const scale = opts.scale
    scale.values = []
    scale.values.push(instance.min)
    const part = (instance.max - instance.min) / (scale.valuesNumber - 1)
    for (let j = 1; j <= scale.valuesNumber - 2; j++) {
      scale.values.push(part * j)
    }
    scale.values.push(instance.max)

    const len = scale.values.length
    const num =
      ((scale.grid - 1) * (scale.gap + 1) + scale.gap) * (len - 1) + len
    const perOfGrid = 100 / (num - 1)
    const perOfValue = 100 / (len - 1)

    this.scale = parseHTML('<div></div>')
    addClass(instance.classes.SCALE, this.scale)
    this.lines = parseHTML('<ul></ul>')
    addClass(instance.classes.LINES, this.lines)
    this.values = parseHTML('<ul></ul>')
    addClass(instance.classes.VALUES, this.values)

    for (let i = 0; i < num; i++) {
      let list
      if (i === 0 || i === num || i % ((num - 1) / (len - 1)) === 0) {
        list = parseHTML(`<li class="${instance.classes.GRID}"></li>`)
      } else if (i % scale.grid === 0) {
        list = parseHTML(`<li class="${instance.classes.INLINEGRID}"></li>`)
      } else {
        list = parseHTML('<li></li>')
      }

      // position scale
      setStyle({ left: `${perOfGrid * i}%` }, list)
      append(list, this.lines)
    }

    for (let v = 0; v < len; v++) {
      // position value
      const li = parseHTML(`<li><span>${scale.values[v]}</span></li>`)
      setStyle({ left: `${perOfValue * v}%` }, li)
      append(li, this.values)
    }

    append(this.lines, this.scale)
    append(this.values, this.scale)
    append(this.scale, instance.control)
  }

  update(instance) {
    this.scale.remove()
    this.init(instance)
  }

  static init(instance) {
    return new Scale(instance)
  }
}

export default Scale

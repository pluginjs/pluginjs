import { append, parseHTML } from '@pluginjs/dom'

class Classifier {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes

    this.$element = parseHTML(`<div class="${this.classes.CLASSIFY}"></div>`)
    // instance.$wrap.append(this.$element)
    append(this.$element, instance.wrap)

    this.init()
  }

  init() {
    this.classType = this.getClassType()

    this.initFilter()
  }

  initFilter() {
    const items = []

    this.classType.forEach(item => {
      items.push({
        text: item,
        id: item
      })
    })

    const filter = document.createElement('div')
    const that = this

    this.filterApi = Pj.filters(filter, {
      default: this.instance.currentClass,
      items,
      onChange: () => {
        if (!that.filterApi) {
          return
        }
        const className = that.filterApi('get')
        this.instance.switchClass(className)
      }
    })

    this.filterApi('set', this.instance.currentClass)

    append(filter, this.$element)
  }

  getClassType() {
    const classType = new Set([this.instance.currentClass])

    this.options.data.map(item => {
      classType.add(item.class)
    })

    return Array.from(classType)
  }
}

export default Classifier

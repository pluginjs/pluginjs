import Base from './base'

class Inline extends Base {
  constructor(instance, data) {
    super(instance, data)
    this.isload = false

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('inline')
    this.element.innerHTML = this.data.html
  }

  afterLoad() {
    this.loaded(this.element)

    return this
  }

  loadHandler(target) {
    this.loaded(target)
  }

  errorHandler(target) {
    return target
  }
}

export default Inline

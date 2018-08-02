import Base from './base'

class Iframe extends Base {
  constructor(instance, data) {
    super(instance, data)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('iframe')
    this.element.src = this.data.src

    this.load(this.element)
  }

  loadHandler() {
    this.loaded()
  }

  errorHandler(target) {
    return target
  }
}

export default Iframe

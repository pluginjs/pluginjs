import Base from './base'

class Iframe extends Base {
  constructor(instance, data, loader) {
    super(instance, data, loader)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('iframe')
    this.element.src = this.data.src

    this.load(this.element)
  }

  loadHandler(target) {
    this.loaded(target)
  }

  errorHandler(target) {
    return target
  }
}

export default Iframe

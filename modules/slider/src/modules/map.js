import Base from './base'

class Map extends Base {
  constructor(instance, data, loader) {
    super(instance, data, loader)
    this.isload = false

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('map')
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

export default Map

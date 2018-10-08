class Base {
  constructor(instance) {
    this.instance = instance
    this.container = instance.container
    this.options = instance.options
    this.containerOptions = instance.containerOptions
    this.speed = instance.speed
  }
}

export default Base

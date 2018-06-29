export default class Interactive {
  constructor(init) {
    this.instance = []
    this.init = () => {
      this.instance.push(init())
    }
  }

  enable() {
    return this.instance.map(instance => instance.enable())
  }

  disable() {
    return this.instance.map(instance => instance.disable())
  }

  destroy() {
    return this.instance.map(instance => instance.destroy())
  }
}

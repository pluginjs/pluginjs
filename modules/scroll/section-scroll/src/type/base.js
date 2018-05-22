import { events as EVENTS } from '../constant'

class Base {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.options = this.instance.options
    this.$sections = this.instance.$sections
    this.$element = this.instance.$element
    this.second = this.options.duration / 1000
  }

  changePage() {
    if (this.instance.is('moveing')) {
      clearTimeout(this.setTimeout)
    }

    this.instance.enter('moveing')

    this.setTimeout = setTimeout(() => {
      this.instance.leave('moveing')
    }, this.options.duration)

    //
    const id = this.instance.getIdByIndex(this.instance.currIndex)
    this.instance.trigger(EVENTS.CHANGE, id)

    this.setNavActive()
    this.changeHash()
  }

  setNavActive() {
    const href = this.instance.getIdByIndex(this.instance.currIndex)
    this.instance.Dots.setActive(href)
  }

  changeHash() {
    const id = this.instance.getIdByIndex(this.instance.currIndex)
    if (history.replaceState) {
      history.replaceState(null, null, id)
    } else {
      const st = this.scrollTop()
      window.location.hash = id
      window.scrollTo(0, st)
    }
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }
}

export default Base

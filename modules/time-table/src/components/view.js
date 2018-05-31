import Weekly from './week/weekly.js'
import Monthly from './month/monthly.js'
import Listly from './list/listly.js'
import { append, parseHTML, query } from '@pluginjs/dom'

class View {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes

    this.element = parseHTML(`<div class="${this.classes.VIEW}"></div>`)
    append(this.element, instance.wrap)

    this.init()
  }

  init() {
    append(`<div class="${this.classes.WEEK}"></div>`, this.element)
    this.weekly = new Weekly(
      this.instance,
      query(`.${this.classes.WEEK}`, this.element)
    )
    append(`<div class="${this.classes.MONTH}"></div>`, this.element)
    this.monthly = new Monthly(
      this.instance,
      query(`.${this.classes.MONTH}`, this.element)
    )
    append(`<div class="${this.classes.LIST}"></div>`, this.element)
    this.listly = new Listly(
      this.instance,
      query(`.${this.classes.LIST}`, this.element)
    )

    this.update() // update when  init

    this.changeView(this.instance.currentMode)
  }

  changeView(currentMode) {
    switch (currentMode) {
      case 'monthly':
        this.monthly.show()
        this.weekly.hide()
        this.listly.hide()
        break
      case 'weekly':
        this.monthly.hide()
        this.weekly.show()
        this.listly.hide()
        break
      case 'listly':
        this.monthly.hide()
        this.weekly.hide()
        this.listly.show()
        break
      default:
        break
    }
  }

  update() {
    if (this.instance.currentMode === 'weekly') {
      this.weekly.update()
    } else if (this.instance.currentMode === 'monthly') {
      this.monthly.update()
    } else if (this.instance.currentMode === 'listly') {
      this.listly.update()
    } else {
      // default
    }
  }
}

export default View

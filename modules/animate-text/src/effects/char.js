import { text, queryAll } from '@pluginjs/dom'

export default class Char {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.element = this.instance.element
    this.initialize()
  }

  initialize() {
    this.text = text(this.element)
    text('', this.element)
    this.instance.splitWord(this.text, true)
    this.chars = queryAll(`.${this.instance.classes.CHAR}`, this.element)
  }
}

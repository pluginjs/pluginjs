import anime from 'animejs'
import { text } from '@pluginjs/dom'

export default class Fade {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.element = this.instance.element
    this.initialize()
    this.setupAnime()
  }

  initialize() {
    this.text = text(this.element)
    text('', this.element)
    this.instance.splitWord(this.text)
  }

  setupAnime(translate) {
    const options = {
      targets: this.element,
      ...translate,
      opacity: [0, 1],
      duration: this.options.duration || 1000,
      easing: 'linear',
      loop: this.options.loop || false,
      delay: this.options.delay,
      endDelay: 1000
    }

    anime(options)
  }
}

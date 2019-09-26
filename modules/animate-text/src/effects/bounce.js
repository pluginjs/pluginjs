import anime from 'animejs'
import { text } from '@pluginjs/dom'

export default class Bounce {
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

  setupAnime() {
    const options = {
      targets: this.element,
      scale: [0.5, 1.2, 0.8, 1.2, 1],
      endDelay: 700 + this.options.duration
    }

    anime
      .timeline({
        duration: this.options.duration,
        easing: 'easeInOutSine',
        loop: this.options.loop
      })
      .add(options)
  }
}

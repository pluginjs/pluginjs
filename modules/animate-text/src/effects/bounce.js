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
      duration: this.options.duration || 1000,
      easing: 'easeInOutSine',
      delay: this.options.delay
    }

    anime
      .timeline({
        loop: this.options.loop || false
      })
      .add(options)
      .add({})
  }
}

import anime from 'animejs'
import { text } from '@pluginjs/dom'

class Fade {
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

export default Fade

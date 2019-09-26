import anime from 'animejs'
import { text } from '@pluginjs/dom'

export default class Zoom {
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
    if (this.options.loop) {
      anime
        .timeline({
          targets: this.element,
          loop: true,
          duration: this.options.duration,
          easing: 'easeInOutQuart'
        })
        .add({
          scale: [0, 1],
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          scale: [1, 1.3],
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.element,
        scale: [0, 1],
        opacity: [0, 1],
        duration: this.options.duration,
        loop: false,
        easing: 'easeInOutQuart'
      })
    }
  }
}

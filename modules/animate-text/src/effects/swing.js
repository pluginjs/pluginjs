import anime from 'animejs'
import { setStyle } from '@pluginjs/styled'
import { text } from '@pluginjs/dom'

export default class Swing {
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
    setStyle('transform-origin', 'top center', this.element)
  }

  setupAnime() {
    const options = {
      targets: this.element,
      rotateZ: [-5, 5, -10, 10, 0],
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

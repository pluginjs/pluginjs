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
      duration: this.options.duration,
      loop: this.options.loop,
      easing: 'easeInOutSine',
      endDelay: 1000
    }

    anime(options)
  }
}

import anime from 'animejs'
import { setStyle } from '@pluginjs/styled'
import Char from './char'

export default class CharSlideDown extends Char {
  constructor(instance) {
    super(instance)
    setStyle(
      {
        overflow: 'hidden',
        'vertical-align': 'bottom'
      },
      this.element
    )
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      translateY: [-100, 0],
      easing: 'easeOutExpo',
      duration: this.options.duration,
      loop: this.options.loop || false,
      delay(el, i) {
        return 60 * i
      },
      endDelay: 1000
    }

    anime(options)
  }
}

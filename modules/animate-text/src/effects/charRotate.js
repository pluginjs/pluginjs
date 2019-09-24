import anime from 'animejs'
import { setStyle } from '@pluginjs/styled'
import Char from './char'

export default class CharRotate extends Char {
  constructor(instance) {
    super(instance)
    setStyle(
      {
        overflow: 'hidden',
        'vertical-align': 'bottom'
      },
      this.element
    )
    this.chars.forEach(char => {
      setStyle('transform-origin', '0 100%', char)
    })
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      translateX: ['0.55em', 0],
      translateY: ['1.1em', 0],
      rotateZ: [180, 0],
      easing: 'easeOutExpo',
      duration: this.options.duration,
      loop: this.options.loop,
      delay(el, i) {
        return 60 * i
      },
      endDelay: 1000
    }

    anime(options)
  }
}

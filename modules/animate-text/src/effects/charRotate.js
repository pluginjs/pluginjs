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
    if (this.options.loop) {
      anime
        .timeline({
          targets: this.chars,
          loop: true,
          duration: this.options.duration,
          delay(el, i) {
            return 60 * i
          }
        })
        .add({
          rotateZ: [180, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          endDelay: 700
        })
        .add({
          rotateZ: [0, -45],
          opacity: [1, 0],
          easing: 'easeInExpo'
        })
    } else {
      anime({
        targets: this.chars,
        rotateZ: [180, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: this.options.duration,
        loop: false,
        delay(el, i) {
          return 60 * i
        }
      })
    }
  }
}

import anime from 'animejs'
import { setStyle } from '@pluginjs/styled'
import Char from './char'

export default class CharPush extends Char {
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
          translateY: ['0.7em', 0],
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          translateY: [0, '-0.5em'],
          easing: 'easeInElastic',
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        translateY: ['0.7em', 0],
        opacity: [0, 1],
        duration: this.options.duration,
        loop: false,
        delay(el, i) {
          return 60 * i
        }
      })
    }
  }
}

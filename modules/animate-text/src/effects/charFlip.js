import anime from 'animejs'
import Char from './char'

export default class CharFlip extends Char {
  constructor(instance) {
    super(instance)
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
          rotateY: [-90, 0],
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          rotateY: [0, 90],
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        rotateY: [-90, 0],
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

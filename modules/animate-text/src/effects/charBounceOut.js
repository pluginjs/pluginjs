import anime from 'animejs'
import Char from './char'

export default class CharBounceOut extends Char {
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
          scale: [0, 1],
          easing: 'easeOutElastic',
          endDelay: 700
        })
        .add({
          scale: [1, 1.5],
          easing: 'easeInElastic',
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        scale: [0, 1],
        easing: 'easeOutElastic',
        duration: this.options.duration,
        loop: false,
        delay(el, i) {
          return 60 * i
        }
      })
    }
  }
}

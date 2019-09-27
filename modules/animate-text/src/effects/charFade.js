import anime from 'animejs'
import Char from './char'

export default class CharFade extends Char {
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
          easing: 'easeInOutQuad',
          delay(el, i) {
            return 60 * i
          }
        })
        .add({
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: this.options.duration,
        loop: false,
        delay(el, i) {
          return 60 * i
        }
      })
    }
  }
}

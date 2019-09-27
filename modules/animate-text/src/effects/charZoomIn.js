import anime from 'animejs'
import Char from './char'

export default class CharZoomIn extends Char {
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
          scale: [2, 1],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          endDelay: 700
        })
        .add({
          scale: [1, 0],
          easing: 'easeInExpo',
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        scale: [2, 1],
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

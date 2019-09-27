import anime from 'animejs'
import Char from './char'

export default class CharFadeDown extends Char {
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
          translateY: ['-0.7em', 0],
          easing: 'easeOutExpo',
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          translateY: [0, '0.4em'],
          easing: 'easeInExpo',
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        translateY: ['-0.7em', 0],
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

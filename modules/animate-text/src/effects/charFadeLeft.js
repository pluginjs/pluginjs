import anime from 'animejs'
import Char from './char'

export default class CharFadeLeft extends Char {
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
          translateX: [20, 0],
          easing: 'easeOutQuart',
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          translateX: [0, -20],
          easing: 'easeInQuart',
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.chars,
        translateX: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuart',
        duration: this.options.duration,
        loop: false,
        delay(el, i) {
          return 60 * i
        }
      })
    }
  }
}

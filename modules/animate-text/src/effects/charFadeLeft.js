import anime from 'animejs'
import Char from './char'

export default class CharFadeLeft extends Char {
  constructor(instance) {
    super(instance)
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      translateX: [40, 0],
      opacity: [0, 1],
      easing: 'easeOutQuart',
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

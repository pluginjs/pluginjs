import anime from 'animejs'
import Char from './char'

export default class CharFadeDown extends Char {
  constructor(instance) {
    super(instance)
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      translateY: ['-1.1em', 0],
      opacity: [0, 1],
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

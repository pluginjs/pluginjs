import anime from 'animejs'
import Char from './char'

export default class CharZoomIn extends Char {
  constructor(instance) {
    super(instance)
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      scale: [2, 1],
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

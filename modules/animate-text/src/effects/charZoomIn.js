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
      scale: [3, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: this.options.duration,
      delay(el, i) {
        return 60 * i
      }
    }

    anime
      .timeline({
        loop: this.options.loop || false
      })
      .add(options)
      .add({})
  }
}

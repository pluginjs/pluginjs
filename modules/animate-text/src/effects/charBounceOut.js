import anime from 'animejs'
import Char from './char'

export default class CharBounceOut extends Char {
  constructor(instance) {
    super(instance)
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      scale: [0, 1],
      easing: 'easeOutElastic',
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

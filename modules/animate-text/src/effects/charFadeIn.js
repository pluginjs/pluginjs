import anime from 'animejs'
import Char from './char'

export default class CharFadeIn extends Char {
  constructor(instance) {
    super(instance)
    this.setupAnime()
  }

  setupAnime() {
    const options = {
      targets: this.chars,
      opacity: [0, 1],
      easing: 'easeInOutQuad',
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

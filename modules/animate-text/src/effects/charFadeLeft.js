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

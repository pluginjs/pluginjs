import Fade from './fade'
import anime from 'animejs'

export default class FadeDown extends Fade {
  setupAnime() {
    if (this.options.loop) {
      anime
        .timeline({
          targets: this.element,
          loop: true,
          duration: this.options.duration,
          easing: 'linear'
        })
        .add({
          translateY: [-20, 0],
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          translateY: [0, 20],
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.element,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: this.options.duration,
        loop: false,
        easing: 'linear'
      })
    }
  }
}

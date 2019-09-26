import Fade from './fade'
import anime from 'animejs'

export default class FadeRight extends Fade {
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
          translateX: [-20, 0],
          opacity: [0, 1],
          endDelay: 700
        })
        .add({
          translateX: [0, 20],
          opacity: [1, 0]
        })
    } else {
      anime({
        targets: this.element,
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: this.options.duration,
        loop: false,
        easing: 'linear'
      })
    }
  }
}

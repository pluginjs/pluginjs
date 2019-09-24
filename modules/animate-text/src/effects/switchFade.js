import Switch from './switch'
import anime from 'animejs'

export default class SwitchFade extends Switch {
  constructor(instance) {
    super(instance)
    this.setupAnime()
  }

  getAnimeDefaultOptions(targets) {
    return {
      targets,
      easing: 'easeInOutQuart',
      duration: this.options.duration,
      begin: this.joinSyncAnimationGroup,
      opacity: [[0, 1], 1, [1, 0]]
    }
  }

  setupAnime() {
    anime(this.getContainerOptions())

    if (this.options.loop) {
      anime(
        Object.assign({}, this.getAnimeDefaultOptions(this.childrens), {
          loop: true,
          delay: (el, i) => i * this.options.duration
        })
      )
    } else {
      const childrens = this.childrens.map((el, index) => {
        if (index === this.childrens.length - 1) {
          return Object.assign(this.getAnimeDefaultOptions(el), {
            opacity: [[0, 1], 1],
            loop: false
          })
        }
        return Object.assign(this.getAnimeDefaultOptions(el), {
          loop: false
        })
      })
      childrens.forEach((children, index) => {
        setTimeout(() => anime(children), index * this.options.duration)
      })
    }
  }
}

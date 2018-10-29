import Switch from './switch'

import anime from 'animejs'

class SwitchFade extends Switch {
  constructor(instance) {
    super(instance)
    this.init()
    this.setupAnime()
  }

  init() {
    this.childrensDuration = this.totalDuration / 2
    this.delayDuration = this.childrensDuration / 4
    this.shownDuration = (this.childrensDuration - this.delayDuration) / 15
    this.gradientDuration =
      (this.childrensDuration - this.delayDuration - this.shownDuration) / 2
  }

  setupAnime() {
    const container = {
      targets: this.element,
      width: [
        [this.widthList[this.widthList.length - 1], this.widthList[0]],
        ...this.widthList.slice(1)
      ],
      duration: this.totalDuration,
      easing: 'easeInOutQuart',
      begin: this.joinSyncAnimationGroup,
      loop: this.options.loop || false,
      delay: this.options.delay
    }

    const childrens = this.childrens.map(el => {
      return {
        targets: el,
        opacity: [
          { value: [0, 1], duration: this.gradientDuration },
          { value: 1, duration: this.shownDuration },
          { value: [1, 0], duration: this.gradientDuration },
          {
            value: 0,
            duration: this.delayDuration,
            delay: this.childrensDuration
          }
        ],
        easing: 'easeInOutQuart',
        duration: this.childrensDuration,
        begin: this.joinSyncAnimationGroup,
        loop: this.options.loop || false,
        delay: this.options.delay,
        complete: () => {
          this.childrens.forEach((el, index) => {
            Object.assign(el.style, this.childrensOriginStyle[index])
          })
        }
      }
    })

    anime(container)
    childrens.forEach((children, index) => {
      setTimeout(() => anime(children), index * 1000)
    })
  }
}

export default SwitchFade

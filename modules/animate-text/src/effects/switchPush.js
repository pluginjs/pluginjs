import Switch from './switch'
import anime from 'animejs'

export default class SwitchPush extends Switch {
  constructor(instance) {
    super(instance)
    this.setupAnime()
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
      loop: this.options.loop || false
    }

    const childrens = this.childrens.map(el => {
      return {
        targets: el,
        opacity: [[0, 1], 1, [1, 0]],
        translateY: [
          this.DOWNTOMID,
          this.MIDTOUP,
          {
            value: this.UPTOHIDDEN,
            delay: this.delayDuration
          }
        ],
        duration: this.childrensDuration,
        begin: this.joinSyncAnimationGroup,
        loop: this.options.loop || false,
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

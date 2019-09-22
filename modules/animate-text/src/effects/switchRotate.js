import Switch from './switch'
import anime from 'animejs'

export default class SwitchRotate extends Switch {
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
        rotateX: [[-90, 0], [0, 90], [90, 90]],
        translateZ: `${this.clientHeight}px`,
        translateY: [
          this.DOWNTOMID,
          this.MIDTOUP,
          {
            value: this.UPTOHIDDEN,
            delay: this.delayDuration
          }
        ],
        easing: 'easeInOutQuart',
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
      setTimeout(() => anime(children), index * this.options.duration)
    })
  }
}

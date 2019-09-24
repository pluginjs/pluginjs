import { setStyle, getHeight } from '@pluginjs/styled'
import SyncAnimation from './syncAnimation'

export default class Switch {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.element = this.instance.element
    this.initialize()
  }

  initialize() {
    this.animationGroup = SyncAnimation.of().createAnimationGroup(
      anime => anime.pause(),
      anime => anime.play()
    )
    this.joinSyncAnimationGroup = anime => this.animationGroup.push(anime)
    this.elementHeight = getHeight(this.element)
    this.instance.switchWord()
    this.childrens = Array.from(this.element.children)
    this.widthList = this.getWidthList(this.element)
    this.setPosition()

    setStyle('height', this.elementHeight, this.element)

    this.DOWNTOMID = [this.elementHeight, 0]
    this.MIDTOUP = [0, this.elementHeight * -1]
    this.totalDuration = this.options.duration * this.childrens.length
  }

  getContainerOptions() {
    return {
      targets: this.element,
      duration: this.totalDuration,
      easing: 'easeOutCirc',
      begin: this.joinSyncAnimationGroup,
      loop: this.options.loop,
      width: this.widthList
    }
  }

  getWidthList(element) {
    const widthArr = Array.from(element.children).map(node => {
      return node.offsetWidth
    })

    const widthList = []

    widthList.push({
      value: widthArr[widthArr.length - 1],
      duration: 0
    })
    widthArr.forEach(width => {
      widthList.push({
        value: width,
        duration: this.options.duration
      })
    })
    return widthList
  }

  setPosition() {
    this.childrens.forEach(el => {
      setStyle(
        {
          opacity: 0,
          position: 'absolute'
        },
        el
      )
    })
  }
}

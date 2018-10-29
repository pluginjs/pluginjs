import { setStyle } from '@pluginjs/styled'
import SyncAnimation from './sync-animation'

class Switch {
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
    this.instance.switchWord()
    this.childrens = Array.from(this.element.children)
    this.widthList = this.getWidthList(this.element)
    this.childrensOriginStyle = this.getChildrensOriginStyle(this.childrens)
    this.clientHeight = this.element.parentElement.clientHeight
    setStyle('height', this.clientHeight, this.element)

    this.DOWNTOMID = [this.clientHeight, 0]
    this.MIDTOUP = [0, this.clientHeight * -1]
    this.UPTOHIDDEN = [this.clientHeight * -1, this.clientHeight * -1]
    this.totalDuration = this.options.duration * this.childrens.length
    this.delayDuration = this.totalDuration / 4
    this.childrensDuration = this.totalDuration - this.delayDuration
  }

  getWidthList(element) {
    const widthList = Array.from(element.children).map(node => {
      return node.offsetWidth
    })
    return widthList
  }

  getChildrensOriginStyle(childrens) {
    return childrens.map(el => {
      const styles = window.getComputedStyle(el)
      const originStyle = {
        opacity: styles.opacity,
        position: styles.position
      }

      setStyle(
        {
          opacity: 0,
          position: 'absolute'
        },
        el
      )
      return originStyle
    })
  }
}

export default Switch

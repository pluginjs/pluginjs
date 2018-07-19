import Base from './base'
import { queryAll } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'

class Stack extends Base {
  constructor(instance) {
    super(instance)
    this.init()
  }

  init() {
    this.$sections.forEach(ele => {
      setStyle(
        {
          transition: `${this.second}s transform ${this.options.easing}`,
          width: '100%'
        },
        ele
      )
    })
    queryAll('html, body').forEach(ele => {
      setStyle({ overflow: 'hidden' }, ele)
    })

    this.get3DPosition()
    this.initSection()
  }

  changePage() {
    const index = this.instance.currIndex - 1
    let i = 0
    const that = this

    this.$sections.forEach(section => {
      if (index > i) {
        const translate3d = `translate3d(${that.position[0].x}, ${
          that.position[0].y
        }, 0px)`
        setStyle({ transform: translate3d }, section)
      } else {
        const translate3d = `translate3d(${that.position[1].x}, ${
          that.position[1].y
        }, 0px)`
        setStyle({ transform: translate3d }, section)
      }
      i++
    })

    super.changePage()
  }

  //
  // destroy() {
  // }

  initSection() {
    let i = 0
    const that = this
    this.$sections.forEach(section => {
      const index = Math.abs(i - that.$sections.length)
      setStyle(
        {
          position: 'absolute'
        },
        section
      )
      section.style.zIndex = index
      i++
    })
  }

  get3DPosition() {
    const stack = [
      {
        x: '0px',
        y: '-100vh'
      },
      {
        x: '0px',
        y: '0px'
      }
    ]

    this.position = stack
  }
}

export default Stack
